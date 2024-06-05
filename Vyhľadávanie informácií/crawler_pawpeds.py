import re
import requests
import datetime


# extract information about one cat from page
def extract_info(cat_id):
    # id → id, g → number of generations (2 is min), p → race (useless, need only for correct search query)
    # URL = 'https://www.pawpeds.com/db/?a=p&id=2&g=2&p=eur'
    page = requests.get(f'https://www.pawpeds.com/db/?a=p&id={cat_id}&g=2&p=eur').text.replace('\n', ' ').replace('&nbsp;', ' ').replace('&amp;', '&')
    cat_info = ''

    # extract cat info
    cat_info = re.search('<th class="pedigree".*>(.*?)</th>', page)
    if cat_info:
        cat_info = cat_info.group(1).strip()
    else:
        return None

    # extract father = sire
    sire = re.search('<span class="siredamInPedigree">Sire</span><br/>(.*?)<a.*?id=(.*?)&.*?">(.*?)</a>(.*?)(<br/>|<a)', page)
    if sire:
        sire = f'{sire.group(1).strip()}|{sire.group(2).strip()}|{sire.group(3).strip()}{sire.group(4).strip()}'
    else:
        foundation = re.search('<tr> <td class="pedigree" rowspan="2">Foundation</td>', page)
        if foundation:
            sire = '###FOUNDATION###|###FOUNDATION###|###FOUNDATION###'
        else:
            sire = '||'

    # extract mother = dam
    dam = re.search('<span class="siredamInPedigree">Dam</span><br/>(.*?)<a.*?id=(.*?)&.*?">(.*?)</a>(.*?)(<br/>|<a)', page)
    if dam:
        dam = f'{dam.group(1).strip()}|{dam.group(2).strip()}|{dam.group(3).strip()}{dam.group(4).strip()}'
    else:
        foundation = re.search('<tr> <td class="pedigree" rowspan="2">Foundation</td>', page)
        if foundation:
            dam = '###FOUNDATION###|###FOUNDATION###|###FOUNDATION###'
        else:
            dam = '||'

    return f'{cat_info}|{sire}|{dam}\n'


def crawler():
    # info in format "id|cat_info|sire_title|sire_id|sire_info|dam_title|dam_id|dam_info"
    start_time = datetime.datetime.now()

    # first cat id: 2
    # last cat id: 2018572
    for i in range(2, 2018572):
        info = extract_info(i)
        file = open('cats_all.txt', 'a', encoding="utf-8")
        if info:
            info = str(i) + '|' + info
            print(info, f'\t\t{datetime.datetime.now() - start_time}')
            file.write(info)
        else:
            print(i, ' prazdny zaznam\n', f'\t\t{datetime.datetime.now() - start_time}')
        file.close()


crawler()
