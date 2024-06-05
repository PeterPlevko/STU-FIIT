import re
import requests
import datetime


# extract information about one cat frm page
def extract_info(cat_id):
    # id → id, act → ? (useless), line → number of generation +1, lang → current language (just so I don't have to crawl russian texts)
    # URL = 'https://tree.sibcat.info/?id=4&act=cats&line=3&lang=en'
    page = requests.get(f'https://tree.sibcat.info/?id={cat_id}&act=cats&line=3&lang=en').text.replace('\r\n', ' ')

    # ID | NAME | SOURCE_DB | SOURCE_ID | TITLE_BEFORE | BREED | COLOR CODE | BIRTH DATE | GENDER |
    # CATTERY | MOTHER_ID | FATHER_ID | MOTHER_NAME | FATHER_NAME
    name = re.search('<TD>Name:</TD> *?<TD>(.*?)</TD>', page)
    if name:
        name = name.group(1).strip()
    else:
        return ''
    source_db = 'sibcat'
    source_id = cat_id
    birth_date = re.search('<TD>Date of Birth:</TD> *?<TD>(.*?)</TD>', page).group(1).strip()
    gender = re.search('<TD>Sex:</TD> *?<TD>(.*?) \(.*?</TD>', page).group(1).strip()
    father_name = re.search('<TD>Father:</TD> *?<TD>.*?<a href=.*?>(.*?)</a>', page).group(1).strip()
    father_id = re.search('<TD>Father:</TD> *?<TD>.*?<a href=.*?id=(.*?)">', page).group(1).strip()
    mother_name = re.search('<TD>Mother:</TD> *?<TD>.*?<a href=.*?>(.*?)</a>', page).group(1).strip()
    mother_id = re.search('<TD>Mother:</TD> *?<TD>.*?<a href=.*?id=(.*?)">', page).group(1).strip()
    title_before = re.search('<TD>Title :</TD> *?<TD>(.*?)</TD>', page).group(1).strip()
    color_code = re.search('<TD>Color:</TD> *?<TD>.*?<a href=.*?>(.*?)\(.*?</a>', page).group(1).strip()
    breed = re.search('<TD>Breed:</TD> *?<TD>(.*?)</TD>', page).group(1).strip()
    cattery = re.search('<TD>Cattery:</TD> *?<TD>.*?<a href=.*?>(.*?)</a>', page).group(1).strip()

    if name == 'unknown':
        return ''
    cattery = '' if cattery == 'unknown' else cattery
    if father_name == 'unknown':
        father_name = ''
        father_id = ''
    if mother_name == 'unknown':
        mother_name = ''
        mother_id = ''

    return f'{cat_id}|{name}|{source_db}|{source_id}|{title_before}|{breed}|{color_code}|{birth_date}|{gender}|' \
           f'{cattery}|{mother_id}|{father_id}|{mother_name}|{father_name}\n'


def crawler():
    start_time = datetime.datetime.now()

    # first cat id: 4
    # last cat id: 11937
    for i in range(4, 11938):
        info = extract_info(i)
        file = open('cats_russian.txt', 'a', encoding="utf-8")
        if info:
            print(info, f'\n{datetime.datetime.now() - start_time}')
            file.write(info)
        else:
            print(i, ' prazdny zaznam\n', f'\t\t{datetime.datetime.now() - start_time}')
        file.close()


crawler()
