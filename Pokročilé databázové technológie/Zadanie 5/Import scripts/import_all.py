from elasticsearch import Elasticsearch, helpers
import time
import configparser
from collections import deque

config = configparser.ConfigParser()
config.read('example.ini')

elastic = Elasticsearch(hosts="http://localhost:9200", basic_auth=(config['ELASTIC']['user'], config['ELASTIC']['password']))
elastic.indices.create(index='tweets', ignore=[400, 404])

print(elastic.info())

actions = []
gst = time.time()
counter = 0
with open("./normalized_tweets.json", encoding='utf-8') as file:
    st = time.time()
    for line in file:
            counter += 1
            action = {
                "_index": 'tweets',
                "_source": line
            }
            actions.append(action)

            if(counter % 10000 == 1 and counter != 1):
                pb = helpers.parallel_bulk(elastic, actions, chunk_size=10000, thread_count=8, queue_size=8, request_timeout=60*60, raise_on_exception=False, raise_on_error=False)
                deque(pb, maxlen = 0)
                actions = []
            
            if(counter % 100000 == 1 and counter != 1):
                et = time.time()
                elapsed_time = et - st
                print('Execution time:', elapsed_time, 'seconds')
                st = time.time()

et = time.time()
elapsed_time = et - st
print('Execution time:', elapsed_time, 'seconds')
pb = helpers.parallel_bulk(elastic, actions, chunk_size=10000, thread_count=8, queue_size=8, request_timeout=60*60, raise_on_exception=False, raise_on_error=False)
deque(pb, maxlen = 0)
actions = []

get = time.time()
g_elapsed_time = get - gst
print('Execution time:', g_elapsed_time, 'seconds')