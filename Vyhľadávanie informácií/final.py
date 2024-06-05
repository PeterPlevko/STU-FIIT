from itertools import combinations
import os
from pathlib import Path

import lucene

from java.nio.file import Paths
from org.apache.lucene.analysis.standard import StandardAnalyzer
from org.apache.lucene.document import Document, Field, FieldType, TextField
from org.apache.lucene.index import IndexOptions, IndexWriter, IndexWriterConfig, DirectoryReader, Term
from org.apache.lucene.queryparser.classic import QueryParser
from org.apache.lucene.store import MMapDirectory
from org.apache.lucene.search import IndexSearcher


# load all cats into dictionary for final print of cat(s)
def load_file(file_name):
    # cats format
    # id(0)|name(1)|source_db(2)|source_id(3)|title_before(4)|title_after(5)|breed(6)|color_code(7)|birth_date(8)|gender(9)|
    # country_origin(10)|country_current(11)|cattery(12)|mother_id(13)|father_id(14)|mother_name(15)|father_name(16)
    file = open(file_name, 'r', encoding='utf-8')
    all_cats = {}
    for line in file:
        if line.strip() != '':
            line = line.split('|')
            all_cats[line[0]] = {
                'id': line[0],
                'name': line[1],
                'source_db': line[2],
                'source_id': line[3],
                'title_before': line[4],
                'title_after': line[5],
                'breed': line[6],
                'color_code': line[7],
                'birth_date': line[8],
                'gender': line[9],
                'country_origin': line[10],
                'country_current': line[11],
                'cattery': line[12],
                'mother_id': line[13],
                'father_id': line[14],
                'mother_name': line[15],
                'father_name': line[16][: -1]
            }
    return all_cats


# create document for one cat, which is going to be indexed, indexing cat's name and breed
def create_doc(cat):
    doc = Document()
    cat_id = cat[0]
    name = cat[1]
    breed = cat[6]

    field_type = FieldType()
    field_type.setStored(True)
    field_type.setIndexOptions(IndexOptions.NONE)
    doc.add(Field("id", str(cat_id), field_type))

    doc.add(Field("name", name, TextField.TYPE_NOT_STORED))

    doc.add(Field("breed", breed, TextField.TYPE_NOT_STORED))

    return doc


# creating index with pylucene, using StandardAnalyser() for analysis
def indexing_lucene(file_name):
    file = open(file_name, 'r', encoding='utf-8')
    store = MMapDirectory(Paths.get('index'))
    analyzer = StandardAnalyzer()
    config = IndexWriterConfig(analyzer)
    config.setOpenMode(IndexWriterConfig.OpenMode.CREATE)
    writer = IndexWriter(store, config)

    for line in file:
        if line.strip() != '':
            line = line.strip().split('|')
            doc = create_doc(line)
            writer.addDocument(doc)

    writer.commit()
    writer.close()


# searching in index with provided query string
def search_lucene(query_string):
    directory = MMapDirectory(Paths.get('index'))
    searcher = IndexSearcher(DirectoryReader.open(directory))
    analyzer = StandardAnalyzer()
    query = QueryParser("name", analyzer).parse(query_string)
    return searcher.search(query, 2000000).scoreDocs, searcher


# printing results of the search, where one line is one document/cat
def print_results(results, searcher, all_cats, paging):
    string = ''
    for i in range(paging, paging + 20):
        if i >= len(results):
            print(len(string) * '-')
            print(f'Number of matching documents in total: {i}/{len(results)}\n')
            print('You saw all cats!')
            return
        doc = searcher.doc(results[i].doc)
        cat = all_cats[doc.get("id")]
        string = f'|{i + 1}| score: {results[i].score} | id: {cat["id"]} | name: {cat["name"]} | breed: {cat["breed"]} | ' \
                 f'color: {cat["color_code"]} | mother: {cat["mother_name"]} | father: {cat["father_name"]} |'
        print(len(string) * '-')
        print(string)
    print(len(string) * '-')
    print(f'Number of matching documents in total: {paging + 20}/{len(results)}\n')


# printing only one cat (when only one cat is returned)
def print_cat(results, searcher, all_cats):
    doc = searcher.doc(results[0].doc)
    cat = all_cats[doc.get("id")]
    cat_id = f' ID: {cat["id"]} '
    name = f' NAME: {cat["name"]} '
    breed = f' BREED: {cat["breed"]} '
    color = f' COLOR: {cat["color_code"]} '
    title_before = f' TITLE BEFORE NAME: {cat["title_before"]} '
    title_after = f' TITLE AFTER NAME: {cat["title_after"]} '
    mother = f' MOTHER: {cat["mother_name"]} '
    father = f' FATHER: {cat["father_name"]} '
    print('-' * 134)
    print('|{:50s}|{:40s}|{:40s}|'.format(name, cat_id, breed))
    print('|{:50s}|{:40s}|{:40s}|'.format(title_before, title_after, color))
    print('|{:50s}|{:81s}|'.format(mother, father))
    print('-' * 134)
    print(f'Number of matching documents in total: {len(results)}\n')


def main():
    file_name = 'cats_merged.csv'
    lucene.initVM(vmargs=['-Djava.awt.headless=true'])

    option = 'none'

    while option not in ['1', '2']:
        print('Do you want to create index? Type 1 for YES or 2 for NO')
        option = str(input('Your option: '))
        if option not in ['1', '2']:
            print('Wrong input, try it again.')

    if option == '1':
        indexing_lucene(file_name)

    print('Loading cats...')
    all_cats = load_file(file_name)
    print('Cats loaded, enjoy!')

    while True:
        paging = 0
        try:
            print("""
                You can search for cat by 'name' and by 'breed'. For that you need to use Query Parser syntax
                (e.g. 'name:Garfield breed:RAG'). Default search is above 'name' field.
                If you want to end program leave blank and press 'ENTER'.
                """)
            query_string = input('Cat you are searching for: ')
            if query_string.strip() == '':
                break
            results, searcher = search_lucene(query_string)
            if len(results) == 1:
                print_cat(results, searcher, all_cats)
            else:
                exit_string = 'init'
                while exit_string.strip() != 'exit':
                    print_results(results, searcher, all_cats, paging)
                    paging += 20
                    if paging >= len(results):
                        break
                    exit_string = input("For exit type 'exit', for more cats press ENTER: ")
                    while exit_string.strip() not in ['exit', '']:
                        print('Wrong input, try it again.')
                        exit_string = input("For exit type 'exit', for more cats press ENTER: ")
        except:
            print('Wrong syntax, try it again.')


main()
