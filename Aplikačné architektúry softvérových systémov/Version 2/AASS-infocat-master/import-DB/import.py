import select
import pandas
from models import m_cats, m_cat_infos, m_breeds, m_references, m_links
from sqlalchemy import create_engine, text
db_string = f'postgresql://postgres:postgres@localhost:5432/infocat'

breeds = {}
cats_inserted = {}


def sanitize_string(string):
    return None if pandas.isnull(string) else str(string)


def sanitize_int(string):
    return None if pandas.isnull(string) else int(string)


def create_cat(row):
    return {
        'id': sanitize_int(row['ID']),
        'name': sanitize_string(row['NAME']),
        'reg_num_origin': sanitize_string(row['REGISTRATION_NUMBER_BEFORE']),
        'reg_num_current': sanitize_string(row['REGISTRATION_NUMBER_CURRENT']),
        'src_db': sanitize_string(row['SOURCE_DB']),
        'src_id': sanitize_int(row['SOURCE_ID']),
        'breed_id': sanitize_int(breeds[row['BREED']]) if row['BREED'] in breeds else None,
        'country_origin': sanitize_string(row['ORIGIN_COUNTRY']),
        'country_current': sanitize_string(row['CURRENT_COUNTRY']),
        'color': sanitize_string(row['COLOR']),
        'color_code': sanitize_string(row['COLOR_CODE']),
        'date_of_birth': sanitize_string(row['BIRTH_DATE']),
        'gender': sanitize_string(row['GENDER']),
    }


def create_catinfo(row):
    data_dicts['m_cat_infos']['maxid'] += 1
    return {
        'id': data_dicts['m_cat_infos']['maxid'],
        'title_before': sanitize_string(row['TITLE_BEFORE']),
        'title_after': sanitize_string(row['TITLE_AFTER']),
        'chip': sanitize_string(row['CHIP']),
        'verified_status': None,
        'cattery': sanitize_string(row['CATTERY']),
        'cat_id': sanitize_int(row['ID']),
    }


def create_link(row):
    links = []
    if not pandas.isnull(row['NOTE(DESCRIPTION)']):
        data_dicts['m_links']['maxid'] += 1

        links.append({
            'id': data_dicts['m_links']['maxid'],
            'type': 'NOTE',
            'content': sanitize_string(row['NOTE(DESCRIPTION)']),
            'cat_id': sanitize_int(row['ID']),
        })
    if not pandas.isnull(row['AWARDS']):
        data_dicts['m_links']['maxid'] += 1

        links.append({
            'id': data_dicts['m_links']['maxid'],
            'type': 'AWARD',
            'content': sanitize_string(row['AWARDS']),
            'cat_id': sanitize_int(row['ID']),
        })
    if not pandas.isnull(row['HEALTH_STATUS']):
        data_dicts['m_links']['maxid'] += 1

        links.append({
            'id': data_dicts['m_links']['maxid'],
            'type': 'HEALTH_STATUS',
            'content': sanitize_string(row['HEALTH_STATUS']),
            'cat_id': sanitize_int(row['ID']),
        })
    return links


def create_breed(row):
    data_dicts['m_breeds']['maxid'] += 1
    return {
        'id': data_dicts['m_breeds']['maxid'],
        'code': sanitize_string(row['BREED']),
    }


def create_reference(row):
    data_dicts['m_references']['maxid'] += 1
    cats_inserted[sanitize_int(row['ID'])] = True
    return {
        'id': data_dicts['m_references']['maxid'],
        'cat_id': sanitize_int(row['ID']),
        'father_id': sanitize_int(row['FATHER_ID']),
        'mother_id': sanitize_int(row['MOTHER_ID']),
        'mother_name': sanitize_string(row['MOTHER_NAME']),
        'father_name': sanitize_string(row['FATHER_NAME']),
        'mother_reg_number': sanitize_string(row['MOTHER_REG_NUMBER']),
        'father_reg_number': sanitize_string(row['FATHER_REG_NUMBER']),
    }


def data_into_entities(row):
    breed = None
    if row['BREED'] not in breeds and not pandas.isnull(row['BREED']):
        breed = create_breed(row)
        breeds[row['BREED']] = data_dicts['m_breeds']['maxid']

    cat = create_cat(row)

    if not(pandas.isnull(row['TITLE_BEFORE']) and pandas.isnull(row['TITLE_AFTER']) and pandas.isnull(row['CHIP']) and pandas.isnull(row['CATTERY'])):
        cat_info = create_catinfo(row)
    else:
        cat_info = None

    if not(pandas.isnull(row['NOTE(DESCRIPTION)']) and pandas.isnull(row['AWARDS']) and pandas.isnull(row['HEALTH_STATUS'])):
        links = create_link(row)
    else:
        links = None

    reference = create_reference(row)
    return cat, cat_info, links, breed, reference


# insert all data into database
def insert_to_db(last=False):
    if last:
        tables = [(m_breeds, 'm_breeds'), (m_cats, 'm_cats'),
                  (m_cat_infos, 'm_cat_infos'), (m_links, 'm_links'), (m_references, 'm_references')]
    else:
        tables = [(m_breeds, 'm_breeds'), (m_cats, 'm_cats'),
                  (m_cat_infos, 'm_cat_infos'), (m_links, 'm_links')]
    for table in tables:
        if len(data_dicts[table[1]]['batch']) > 0:
            with engine.connect() as conn:
                conn.execute(table[0].insert(), data_dicts[table[1]]['batch'])
                conn.commit()

    for table in tables:
        data_dicts[table[1]]['batch'] = []


def import_data(filename):
    df = pandas.read_csv(filename, encoding="utf-8", delimiter='|', header=0, lineterminator='\n')
    for index, row in df.iterrows():
        if str(row['ID']).count('\r\n') != 0:
            row['ID'] = row['ID'].replace('\r\n', '')
        if str(row['ID']).count('\n') != 0:
            row['ID'] = row['ID'].replace('\n', '')
        if str(row['ID']).count('"') != 0:
            row['ID'] = row['ID'].replace('"', '')
        if len(str(row['ID'])) == 0:
            continue
        cat, cat_info, links, breed, reference = data_into_entities(row)
        if cat is not None:
            data_dicts['m_cats']['batch'].append(cat)
        if cat_info is not None:
            data_dicts['m_cat_infos']['batch'].append(cat_info)
        if links is not None and len(links) > 0:
            data_dicts['m_links']['batch'].extend(links)
        if breed is not None:
            data_dicts['m_breeds']['batch'].append(breed)
        if reference is not None:
            data_dicts['m_references']['batch'].append(reference)

        if len(data_dicts['m_cats']['batch']) > 10000:
            insert_to_db()

        if index % 10000 == 0:
            print(index)

    insert_to_db(True)


data_dicts = {
    'm_cats': {'batch': []},
    'm_breeds': {'maxid': 50, 'batch': []},
    'm_cat_infos': {'maxid': 0, 'batch': []},
    'm_links': {'maxid': 0, 'batch': []},
    'm_references': {'maxid': 0, 'batch': []},
}

engine = create_engine(db_string)

with engine.connect() as conn:
    sql = text('DELETE from links')
    result = conn.execute(sql)
    sql = text('DELETE from cat_references')
    result = conn.execute(sql)
    sql = text('DELETE from cat_informations')
    result = conn.execute(sql)
    sql = text('DELETE from cats')
    result = conn.execute(sql)
    sql = text('DELETE from breeds where id > 50 ')
    result = conn.execute(sql)
    sql = text('SELECT * from breeds')
    result = conn.execute(sql).fetchall()
    for record in result:
        breeds[record[1]] = record[0]
        # breeds[record['code']] = record['id']

if __name__ == '__main__':
    import_data("all_cats_sanitized.csv")

with engine.connect() as conn:
    sql = text(
        """SELECT setval('breeds_id_seq'::regclass, (SELECT MAX(id) FROM breeds)+1);
SELECT setval('cats_id_seq'::regclass, (SELECT MAX(id) FROM cats)+1);
SELECT setval('cat_informations_id_seq'::regclass, (SELECT MAX(id) FROM cat_informations)+1);
SELECT setval('links_id_seq'::regclass, (SELECT MAX(id) FROM links)+1);
SELECT setval('cat_references_id_seq'::regclass, (SELECT MAX(id) FROM cat_references)+1);
""")
    result = conn.execute(sql)
