import datetime
import os
import re
import sys
import csv

from pyspark.sql import SparkSession, functions

from static_lists import breeds

os.environ['PYSPARK_PYTHON'] = sys.executable
os.environ['PYSPARK_DRIVER_PYTHON'] = sys.executable
counter_id = 0
all_ids = {}

# cats format
# id(0)|name(1)|source_db(2)|source_id(3)|title_before(4)|title_after(5)|breed(6)|color_code(7)|birth_date(8)|gender(9)|
# country_origin(10)|country_current(11)|cattery(12)|mother_id(13)|father_id(14)|mother_name(15)|father_name(16)


# region PAWPEDS
# returns parsed cat in format (id, [list, of, cats, info])
def parse_cat(cat, title_after_array):
    name = ''
    source_db = 'pawpeds'
    source_id = cat['id']
    title_before = ''
    title_after = ''
    breed = ''
    color_code = ''
    birth_date = ''
    gender = ''
    country_origin = ''
    country_current = ''
    mother_id = ''
    father_id = ''
    mother_name = ''
    father_name = ''

    if cat['cat_sire_id'].strip() != '###FOUNDATION###':
        father_id = cat['cat_sire_id'].strip()
    else:
        father_id = ''
        father_name = '###FOUNDATION###'

    if cat['cat_dam_id'].strip() != '###FOUNDATION###':
        mother_id = cat['cat_dam_id'].strip()
    else:
        mother_id = ''
        mother_name = '###FOUNDATION###'

    if re.search('Identical cattery', cat['cat_info'].strip()) or re.search('Funny Coons = Cattery DE', cat['cat_info'].strip()):
        return (None, [name, source_db, source_id, title_before, title_after, breed, color_code, birth_date, gender,
                       country_origin, country_current, mother_id, father_id, mother_name, father_name])

    name_dump = ''
    # regex for title before name
    regex_before = '^([A-Z]([r]|[A-Z]|-|,|\.|_|\'|[0-9]|&|\(|\)| )+) [A-Z](?!([A-Z]|-|,|\.|_|\'|[0-9]|&|\(|\)| ))'
    if re.search('^(.+?), (M,.*$|F,.*$|M$|F$)', cat['cat_info'].strip()):
        name_dump = re.search('^(.+?), (M,.*$|F,.*$|M$|F$)', cat['cat_info'].strip()).group(1).strip()
        if re.search(regex_before, name_dump):
            title_before = re.search(regex_before, name_dump).group(1).strip()
            name = name_dump.split(title_before)[1].strip()
            for title_curr in title_after_array:
                if title_curr in name:
                    if title_after:
                        title_after += ', ' + title_curr
                    else:
                        title_after = title_curr
                    name = (name.split(title_curr)[0].strip() + ' ' + name.split(title_curr)[1].strip()).strip()
                    while name[len(name) - 1] == ',':
                        name = name[:len(name) - 1].strip()
        else:
            name = name_dump
        cat_info = re.search('^(.+?), (M,.*$|F,.*$|M$|F$)', cat['cat_info'].strip()).group(2).strip().split(', ')
    else:
        if re.search(regex_before, cat['cat_info'].strip()):
            title_before = re.search(regex_before, cat['cat_info'].strip()).group(1)
            cat_info = cat['cat_info'].split(title_before)[1].strip().split(', ')
        else:
            cat_info = cat['cat_info'].split(', ')

    # parsing with regexes info about cat e.g. color code, breed, country and other...
    for info in cat_info:
        info_breed = info.strip()[:3]
        if info_breed in breeds.keys() and re.search('^[A-Z]{3}(?![A-Z])', info.strip()):
            color_code = info.strip()[4:].strip()
            breed = info_breed
        elif re.search('^([0-9]{1,2}/[0-9]{1,2}/[0-9]{2})$', info.strip()):
            birth_date = re.search('^([0-9]{1,2}/[0-9]{1,2}/[0-9]{2})$', info.strip()).group(1)
        elif re.search('^(([a-zA-Z]{1,2}|-|[A-Z][0-9]|)/([a-zA-Z]{1,2}|-|[A-Z][0-9]|))$', info.strip()):
            country = re.search('^(([a-zA-Z]{1,2}|-|[A-Z][0-9]|)/([a-zA-Z]{1,2}|-|[A-Z][0-9]|))$', info.strip()).group(0).split('/')
            country_origin = country[0].strip()
            country_current = country[1].strip()
        elif info.strip() in ['M', 'F']:
            gender = info.strip()
        else:
            if name != '':
                random_info = ['', '*']
                if info.strip() in random_info or re.search('^((,|[0-9])+)$', info.strip()):
                    continue
                elif re.search('^([a-zA-Z]{3}) (.+)$', info.strip()) and re.search('^([a-zA-Z]{3}) (.+)$',
                                                                                   info.strip()).group(
                        1).upper() in breeds.keys():
                    breed = re.search('^([a-zA-Z]{3}) (.+)$', info.strip()).group(0).upper()
                    color_code = re.search('^([a-zA-Z]{3}) (.+)$', info.strip()).group(1).upper()
                elif re.search('^([a-zA-Z]{3})$', info.strip()) and re.search('^([a-zA-Z]{3})$', info.strip()).group(
                        0).upper() in breeds.keys():
                    breed = re.search('^([a-zA-Z]{3})$', info.strip()).group(0).upper()
                elif re.search('^(([A-Z]{2,3}|ASIAN|Housecat) (([a-zA-Z]|[0-9]).*))$', info.strip()):
                    if breed == '':
                        breed = re.search('^(([A-Z]{2,3}|ASIAN|Housecat) (([a-zA-Z]|[0-9]).*))$', info.strip()).group(2)
                        color_code = re.search('^(([A-Z]{2,3}|ASIAN|Housecat) (([a-zA-Z]|[0-9]).*))$',
                                               info.strip()).group(3)
                elif re.search('^([a-z]{1,2} [0-9]+.*)$', info.strip()):
                    color_code = re.search('^([a-z]{1,2} [0-9]+.*)$', info.strip()).group(0)
                elif re.search('^([a-z]{1,2})$', info.strip()):
                    color_code = re.search('^([a-z]{1,2})$', info.strip()).group(0)
                elif re.search('^(([A-Z]| )+)$', info.strip()):
                    title_after = re.search('^(([A-Z]| )+)$', info.strip()).group(0)
                elif re.search('Var-', info.strip()):
                    if color_code:
                        color_code += ' ' + re.search('Var-', info.strip()).group(0)
                    else:
                        color_code = re.search('Var-', info.strip()).group(0)
                elif re.search('^(([A-Z]?[a-z]+)+)$', info.strip()) and re.search('^(([A-Z]?[a-z]+)+)$',
                                                                                  info.strip()).group(
                        0) in breeds.values():
                    for breed_code, breed_name in breeds.items():
                        if breed_name == re.search('^(([A-Z]?[a-z]+)+)$', info.strip()).group(0):
                            breed = breed_code
                            break
                else:
                    if re.search('(^([a-zA-Z]| |ß|-|&|\.|Ç|\(|\)|;|é|/)+$)', info.strip()):
                        if color_code == '':
                            color_code = re.search('(^([a-zA-Z]| |ß|-|&|\.|Ç|\(|\)|;|é|/)+$)', info.strip()).group(0)
                    else:
                        if re.search('^[0-9]\.[0-9]{2}(c| |)m$', info.strip()) or re.search('^[0-9]{2} [0-9]{2}$', info.strip()):
                            continue
                        elif info.strip() in ['Promises!', 'Ii!']:
                            name += ', ' + info.strip()
                        else:
                            if color_code == '':
                                color_code = info.strip()
                            else:
                                color_code += ' ' + info.strip()
            else:
                name = info.strip()

    return (str(source_id), [name, source_db, source_id, title_before, title_after, breed, color_code, birth_date,
                             gender, country_origin, country_current, '', mother_id, father_id, mother_name,
                             father_name])


# update cats parent's names
def parse_parents(cat_id, cats_rdd):
    global counter_id
    global all_ids
    cat = cats_rdd[cat_id]

    if cat[12] and cat[14] != '###FOUNDATION###':
        cat[14] = cats_rdd[cat[12]][0]

    if cat[13] and cat[15] != '###FOUNDATION###':
        cat[15] = cats_rdd[cat[13]][0]

    name = cat[0].strip()
    source_db = cat[1].strip()
    source_id = cat[2].strip()
    title_before = cat[3].strip()
    title_after = cat[4].strip()
    breed = cat[5].strip()
    color_code = cat[6].strip()
    birth_date = cat[7].strip()
    gender = cat[8].strip()
    country_origin = cat[9].strip()
    country_current = cat[10].strip()
    cattery = cat[11].strip()
    mother_id = cat[12].strip()
    father_id = cat[13].strip()
    mother_name = cat[14].strip()
    father_name = cat[15].strip()
    counter_id += 1
    all_ids[source_id] = str(counter_id)
    return str(counter_id), name, source_db, source_id, title_before, title_after, breed, color_code, birth_date, \
           gender, country_origin, country_current, cattery, mother_id, father_id, mother_name, father_name


# update cats parent's ids with new values
def update_parents_id(cat):
    mom_id = all_ids[cat[13]] if cat[13] else cat[13]
    dad_id = all_ids[cat[14]] if cat[14] else cat[14]
    return cat[0], cat[1], cat[2], cat[3], cat[4], cat[5], cat[6], cat[7], cat[8], cat[9], cat[10], cat[11], cat[12], \
           mom_id, dad_id, cat[15], cat[16]


# distributed parsing pawpeds cats database with pyspark
def parse_pawpeds():
    start_time = datetime.datetime.now()
    spark_session = SparkSession.builder.master('local[*]').appName('Parsing Cats').getOrCreate()
    cats_old = spark_session.read.text('cats_all.txt')
    new_file = open('cats_pawpeds.csv', 'w', encoding='utf-8')
    title_after_array = ['NW12', "NW'T07", 'SW\'01', "WW'02", "SW'03", "SW'98", "SW'01", "SW'99", "SW'00", 'KOY', "COY",
                         "SW'00'01", 'SGC IW', 'LA', 'SW06', 'NW08', "CNW", 'MO', 'CA OF BAJA', 'JW', 'DVM', 'DM',
                         'DSM', 'RW', 'OD', 'OS', 'NW', "SM", "RM", 'CM', 'WW', 'GDP', 'DVE']
    # old cat format
    # "id|cat_info|sire_title|sire_id|sire_info|dam_title|dam_id|dam_info"

    # old "id" is key and new "id" is value
    all_columns = functions.split(cats_old['value'], '\|')
    cats_old = cats_old.withColumn('id', all_columns.getItem(0))
    cats_old = cats_old.withColumn('cat_info', all_columns.getItem(1))
    cats_old = cats_old.withColumn('cat_sire_title', all_columns.getItem(2))
    cats_old = cats_old.withColumn('cat_sire_id', all_columns.getItem(3))
    cats_old = cats_old.withColumn('cat_sire_info', all_columns.getItem(4))
    cats_old = cats_old.withColumn('cat_dam_title', all_columns.getItem(5))
    cats_old = cats_old.withColumn('cat_dam_id', all_columns.getItem(6))
    cats_old = cats_old.withColumn('cat_dam_info', all_columns.getItem(7))
    cats_old = cats_old.drop('value')

    cats_rdd = cats_old.rdd
    cats_rdd = cats_rdd.map(lambda cat: parse_cat(cat, title_after_array)) \
        .filter(lambda row: row[0] is not None) \
        .collectAsMap()

    cats_new = list(map(lambda x: parse_parents(x, cats_rdd), cats_rdd))
    cats_new = list(map(lambda x: update_parents_id(x), cats_new))
    print(datetime.datetime.now() - start_time)
    csv.writer(new_file, delimiter='|').writerows(cats_new)
    new_file.close()
# endregion


# region RUSSIAN DB
# changing format of the date to date/month/year from month/date/year
def parse_date(birth_date):
    if birth_date.strip() != '':
        date_divided = birth_date.split('/')
        day = date_divided[1]
        month = date_divided[0]
        year = date_divided[2]
        return day + '/' + month + '/' + year
    return birth_date


# changing format of gender to just F/M
def parse_gender(gender):
    if gender.strip() == 'male':
        gender = 'M'
    elif gender.strip() == 'female':
        gender = 'F'
    return gender


# updating parent's ids with new ones
def update_russian(cat, all_ids_russian):
    mom_id = all_ids_russian[cat[10]] if cat[10] else cat[10]
    dad_id = all_ids_russian[cat[11]] if cat[11] else cat[11]
    birth_day = parse_date(cat[7])
    gender = parse_gender(cat[8])
    return cat[0], cat[1], cat[2], cat[3], cat[4], '', cat[5], cat[6], birth_day, gender, '', '', cat[9], \
           mom_id, dad_id, cat[12], cat[13]


# parsing russian cats database
def parse_russian():
    cats_old = open('cats_russian.txt', 'r', encoding='utf-8')
    new_file = open('cats_russian.csv', 'w', encoding='utf-8')
    cats_new = []
    all_ids_russian = {}
    new_id = 1

    for line in cats_old:
        line = line.split('|')
        cat_id = str(new_id)
        all_ids_russian[line[3]] = cat_id
        cats_new.append([cat_id] + line[1:-1] + [line[-1][:-1]])
        new_id += 1
    cats_new = list(map(lambda x: update_russian(x, all_ids_russian), cats_new))
    csv.writer(new_file, delimiter='|').writerows(cats_new)
# endregion


def dict_to_list(cat_id, cats_all):
    return [cat_id] + cats_all[cat_id]


# merging databases into one with solving doubles (having one cat in both databases)
def merge_databases():
    start_time = datetime.datetime.now()
    pawpeds = open('cats_pawpeds.csv', 'r', encoding='utf-8')
    russian = open('cats_russian.csv', 'r', encoding='utf-8')
    merged_file = open('cats_merged.csv', 'w', encoding='utf-8')
    cats_all = {}
    cats_exist = {}
    for line in pawpeds:
        if line.strip() == '':
            continue
        line = line.split('|')
        cats_all[line[0]] = line[1:-1] + [line[-1][:-1]]
        unique_string = (line[1].strip() + '|' + line[15].strip() + '|' + line[16].strip()).lower()
        cats_exist[unique_string] = line[0].strip()

    for line in russian:
        if line.strip() == '':
            continue
        line = line.split('|')
        unique_string = (line[1].strip() + '|' + line[15].strip() + '|' + line[16].strip()).lower()
        if cats_exist.get(unique_string) is None:
            cats_all[line[0]] = line[1:-1] + [line[-1][:-1]]
        else:
            cat_russian = line
            cat_pawpeds = cats_all[cats_exist[unique_string]]
            cat_pawpeds[3] = cat_russian[4]
            cat_pawpeds[5] = cat_russian[6]
            cat_pawpeds[6] = cat_russian[7]
            cats_all[cats_exist[unique_string]] = cat_pawpeds

    cats_all = list(map(lambda x: dict_to_list(x, cats_all), cats_all))
    csv.writer(merged_file, delimiter='|').writerows(cats_all)
    print(datetime.datetime.now() - start_time)


def main():
    parse_pawpeds()
    parse_russian()
    merge_databases()


main()

