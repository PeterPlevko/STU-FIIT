import multiprocessing
from sqlalchemy.pool import NullPool
from datetime import datetime
import gzip
import orjson
from config import db_string
from sqlalchemy import create_engine
from models import m_authors, m_conversations, m_context_entities, m_context_domains, m_context_annotations, \
    m_annotations, m_links, m_hashtags, m_conversation_hashtags, m_conversation_references

# size of batch used in bulk insert
BATCH_SIZE = 100000
# if debug True, use only 200k tweets and authors
DEBUG = False


# sanitize strings before inserting them into the database to avoid errors due to special characters in the text
def sanitize_string(string, nullable=False):
    return string.replace("\x00", "\uFFFD") if len(string) > 0 else (None if nullable else '')


# sanitize strings before inserting them into the database to avoid errors due to special characters in the text
def nullable_string(string):
    return string if len(string) > 0 else None


# create author entity with table names as keys
def create_author(obj):
    return {'id': int(obj['id']),
            'username': obj['username'],
            'name': sanitize_string(obj['name'], True),
            'description': sanitize_string(obj['description'], True),
            'followers_count': int(obj['public_metrics']['followers_count']),
            'following_count': int(obj['public_metrics']['following_count']),
            'listed_count': int(obj['public_metrics']['listed_count']),
            'tweet_count': int(obj['public_metrics']['tweet_count'])}


# create domain_entity or domain_annotation with table names as keys
def create_domain_entity_annotation(obj):
    return {'id': int(obj['id']),
            'description': nullable_string(obj['description']) if 'description' in obj else None,
            'name': nullable_string(obj['name'])}


# create context_annotation entity with table names as keys
def create_context_annotations(conv_id, domain, entity):
    return {'conversation_id': conv_id,
            'context_domain_id': int(domain['id']),
            'context_entity_id': int(entity['id'])}


# create annotation entity with table names as keys
def create_annotation(conv_id, obj):
    return {'conversation_id': conv_id,
            'value': obj['normalized_text'],
            'type': obj['type'],
            'probability': float(obj['probability'])}


# create link entity with table names as keys
def create_link(conv_id, obj):
    return {'conversation_id': conv_id,
            'url': obj['expanded_url'],
            'description': nullable_string(obj['description']) if 'description' in obj else None,
            'title': nullable_string(obj['title']) if 'title' in obj else None}


# create hashtag entity with table names as keys
def create_hashtag(obj):
    return {'tag': obj['tag']}


# create conversation_hashtag entity with table names as keys
def create_conversation_hashtag(conv_id, hashtag_id):
    return {'conversation_id': conv_id,
            'hashtag_id': hashtag_id}


# create conversation_reference entity with table names as keys
def create_reference(conv_id, obj):
    return {'conversation_id': conv_id,
            'parent_id': int(obj['id']),
            'type': obj['type']}


# create conversation entity with table names as keys
def create_conversation(obj):
    return {'id': int(obj['id']),
            'text': obj['text'],
            'content': obj['text'],
            'possibly_sensitive': obj['possibly_sensitive'],
            'language': obj['lang'],
            'source': obj['source'],
            'author_id': int(obj['author_id']),
            'created_at': datetime.strptime(obj['created_at'], '%Y-%m-%dT%H:%M:%S.%fZ'),
            'reply_count': int(obj['public_metrics']['reply_count']),
            'retweet_count': int(obj['public_metrics']['retweet_count']),
            'like_count': int(obj['public_metrics']['like_count']),
            'quote_count': int(obj['public_metrics']['quote_count']),
            'conversation_id': int(obj['conversation_id'])}


# parse json file and prepare data for insertion
def parse_json_into_entities(obj):
    conversation = create_conversation(obj)
    conversation_id = int(obj['id'])

    domains = []
    entities = []
    context_annotations = []
    if 'context_annotations' in obj:
        for annotation in obj['context_annotations']:
            if int(annotation['domain']['id']) not in data_dicts['m_context_domains']['ids']:
                new_domain = create_domain_entity_annotation(
                    annotation['domain'])
                domains.append(new_domain)
                data_dicts['m_context_domains']['ids'].add(new_domain['id'])

            if int(annotation['entity']['id']) not in data_dicts['m_context_entities']['ids']:
                new_entity = create_domain_entity_annotation(
                    annotation['entity'])
                entities.append(new_entity)
                data_dicts['m_context_entities']['ids'].add(new_entity['id'])

            context_annotations.append(create_context_annotations(conversation_id,
                                                                  annotation['domain'], annotation['entity']))

    annotations = []
    if 'entities' in obj and 'annotations' in obj['entities']:
        for annotation in obj['entities']['annotations']:
            annotations.append(create_annotation(conversation_id, annotation))

    links = []
    if 'entities' in obj and 'urls' in obj['entities']:
        for link in obj['entities']['urls']:
            new_link = create_link(conversation_id, link)
            if len(new_link['url']) <= 2048:
                links.append(new_link)

    hashtags = []
    conversation_hashtags = []
    if 'entities' in obj and 'hashtags' in obj['entities']:
        for hashtag in obj['entities']['hashtags']:
            new_hashtag = create_hashtag(hashtag)
            if new_hashtag['tag'] not in data_dicts['m_hashtags']['tags']:
                new_hashtag['id'] = data_dicts['m_hashtags']['max_id']
                data_dicts['m_hashtags']['max_id'] += 1
                data_dicts['m_hashtags']['tags'][new_hashtag['tag']
                                                 ] = new_hashtag['id']
                hashtags.append(new_hashtag)
            else:
                new_hashtag['id'] = data_dicts['m_hashtags']['tags'][new_hashtag['tag']]

            conversation_hashtags.append(
                create_conversation_hashtag(conversation_id, new_hashtag['id']))

    return conversation, domains, entities, context_annotations, annotations, links, hashtags, conversation_hashtags


def parse_json_into_references(obj):
    conversation_id = int(obj['id'])
    conv_reference = []
    if 'referenced_tweets' in obj:
        for reference in obj['referenced_tweets']:
            if int(reference['id']) in data_dicts['m_conversations']['ids']:
                conv_reference.append(
                    create_reference(conversation_id, reference))

    return conv_reference


# get hours, minutes and seconds from time delta
def get_data_for_timestamp(start_time):
    hours, remainder = divmod(
        (datetime.now() - start_time).seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return hours, minutes, seconds


# print timestamp into file
def write_timestamp(file, start_global, start_batch):
    hours_batch, minutes_batch, seconds_batch = get_data_for_timestamp(
        start_batch)
    hours_global, minutes_global, seconds_global = get_data_for_timestamp(
        start_global)

    file.write(datetime.now().strftime("%Y-%m-%dT%H-%MZ") + ';' +
               '{:02}:{:02}'.format(minutes_global + hours_global * 60, seconds_global) + ";" +
               '{:02}:{:02}'.format(minutes_batch, seconds_batch) + '\n')
    file.flush()


# insert datas into table
def run_in_process(table, datas):
    with engine.connect() as conn:
        conn.execute(table[0].insert(), datas)


# initialize engine
def initializer():
    engine.dispose(close=False)


# insert all data into database
def insert_to_db(last=False):
    tables = [(m_authors, 'm_authors'), (m_conversations, 'm_conversations'), (m_context_domains, 'm_context_domains'), (m_context_entities, 'm_context_entities'),
              (m_annotations, 'm_annotations'), (m_links, 'm_links'), (m_hashtags,
                                                                       'm_hashtags'), (m_context_annotations, 'm_context_annotations'),
              (m_conversation_hashtags, 'm_conversation_hashtags'), (m_conversation_references, 'm_conversation_references')]
    processes = []
    to_delete = []
    for table in tables:
        if (len(data_dicts[table[1]]['batch']) >= BATCH_SIZE) or last:
            if len(data_dicts[table[1]]['batch']) > 0:
                to_delete.append(table[1])
                p = multiprocessing.Process(target=run_in_process, args=[
                                            table, data_dicts[table[1]]['batch']])
                p.start()
                processes.append(p)

    for p in processes:
        p.join()

    for table in to_delete:
        data_dicts[table]['batch'] = []


# add data to authors batch
def add_data_authors(obj):
    if int(obj['id']) not in data_dicts['m_authors']['ids']:
        data_dicts['m_authors']['ids'].add(int(obj['id']))
        data_dicts['m_authors']['batch'].append(
            create_author(obj))


# add data to entities batch
def add_data_entities(obj):
    if int(obj['id']) not in data_dicts['m_conversations']['ids']:
        if int(obj['author_id']) not in data_dicts['m_authors']['ids']:
            data_dicts['m_authors']['ids'].add(
                int(obj['author_id']))
            data_dicts['m_authors']['batch'].append(
                {'id': int(obj['author_id'])})

        data_dicts['m_conversations']['ids'].add(int(
            obj['id']))
        conversation, domains, entities, context_annotations_data, annotations, links, hashtags, conversation_hashtags = parse_json_into_entities(
            obj)

        data_dicts['m_conversations']['batch'].append(
            conversation)
        data_dicts['m_context_annotations']['batch'].extend(
            context_annotations_data)
        data_dicts['m_annotations']['batch'].extend(
            annotations)
        data_dicts['m_links']['batch'].extend(links)
        data_dicts['m_hashtags']['batch'].extend(hashtags)
        data_dicts['m_conversation_hashtags']['batch'].extend(
            conversation_hashtags)
        data_dicts['m_context_domains']['batch'].extend(
            domains)
        data_dicts['m_context_entities']['batch'].extend(
            entities)


# add data to references batch
def add_data_references(obj):
    if int(obj['id']) not in data_dicts['m_conversation_references']['ids']:
        conv_reference = parse_json_into_references(obj)
        data_dicts['m_conversation_references']['ids'].add(
            int(obj['id']))

        data_dicts['m_conversation_references']['batch'].extend(
            conv_reference)


# go through all files, parse data and insert into database
def import_data(list_of_files, list_of_funcs):
    start_global = datetime.now()
    with open('timestamp.txt', 'w') as timestamp:
        for i in range(len(list_of_files)):
            count = 0
            start_batch = datetime.now()
            with gzip.open(list_of_files[i]) as file:
                for line in file:
                    obj = orjson.loads(line)
                    count += 1
                    list_of_funcs[i](obj)

                    if count % BATCH_SIZE == BATCH_SIZE - 1:
                        # insert batch
                        insert_to_db()

                        # write timestamp
                        write_timestamp(timestamp, start_global, start_batch)
                        start_batch = datetime.now()

                    if DEBUG and count >= 200_000:
                        break

                # insert remaining data
                insert_to_db(True)

        start_batch = datetime.now()
        with engine.connect() as conn:
            conn.execute(
                """ALTER TABLE ONLY public.annotations ADD CONSTRAINT annotations_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id); """)
            conn.execute("""ALTER TABLE ONLY public.context_annotations ADD CONSTRAINT context_annotations_context_domain_id_fkey FOREIGN KEY (context_domain_id) REFERENCES public.context_domains(id);""")
            conn.execute("""ALTER TABLE ONLY public.context_annotations ADD CONSTRAINT context_annotations_context_entity_id_fkey FOREIGN KEY (context_entity_id) REFERENCES public.context_entities(id);""")
            conn.execute("""ALTER TABLE ONLY public.context_annotations ADD CONSTRAINT context_annotations_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);""")
            conn.execute("""ALTER TABLE ONLY public.conversation_hashtags ADD CONSTRAINT conversation_hashtags_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);""")
            conn.execute("""ALTER TABLE ONLY public.conversation_hashtags ADD CONSTRAINT conversation_hashtags_hashtag_id_fkey FOREIGN KEY (hashtag_id) REFERENCES public.hashtags(id);""")
            conn.execute("""ALTER TABLE ONLY public.conversation_references ADD CONSTRAINT conversation_references_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);""")
            conn.execute("""ALTER TABLE ONLY public.conversation_references ADD CONSTRAINT conversation_references_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.conversations(id);""")
            conn.execute(
                """ALTER TABLE ONLY public.conversations ADD CONSTRAINT conversations_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id);""")
            conn.execute(
                """ALTER TABLE ONLY public.links ADD CONSTRAINT links_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);""")
        write_timestamp(timestamp, start_global, start_batch)


data_dicts = {
    'm_context_annotations': {'batch': []},
    'm_conversation_references': {'ids': set(), 'batch': []},
    'm_conversation_hashtags': {'batch': []},
    'm_conversations': {'ids': set(), 'batch': []},
    'm_hashtags': {'tags': {}, 'max_id': 1, 'batch': []},
    'm_context_domains': {'ids': set(), 'batch': []},
    'm_context_entities': {'ids': set(), 'batch': []},
    'm_annotations': {'batch': []},
    'm_links': {'batch': []},
    'm_authors': {'ids': set(), 'batch': []},
}
engine = create_engine(db_string, poolclass=NullPool)

if __name__ == '__main__':
    import_data(["authors.jsonl.gz", "conversations.jsonl.gz",
                "conversations.jsonl.gz"], [add_data_authors, add_data_entities, add_data_references])
