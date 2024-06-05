from datetime import datetime
from math import ceil

import pytz
from django.db.models import Q, Count
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from V2.companies2.models import Companies


def date_validator(date_str):
    try:
        datetime.fromisoformat(date_str)
    except ValueError:
        return False
    return True


def get_companies(request):
    white_list = [
        "cin", "name", "br_section", "address_line", "last_update", "created_at", "updated_at",
        "or_podanie_issues_count", "znizenie_imania_issues_count", "likvidator_issues_count",
        "konkurz_vyrovnanie_issues_count", "konkurz_restrukturalizacia_actors_count"
    ]
    white_list_1 = ["DESC", "ASC"]
    page = request.GET.get('page', "1")
    per_page = request.GET.get('per_page', "10")
    order_by_column_name = request.GET.get('order_by', "cin")
    order_by_type = request.GET.get('order_type', "DESC")
    if order_by_column_name not in white_list:
        order_by_column_name = "cin"
    if order_by_type not in white_list_1:
        order_by_type = "DESC"

    if order_by_type == "DESC":
        order_by = "-" + order_by_column_name[0:]
    else:
        order_by = "+" + order_by_column_name[0:]

    query = request.GET.get('query', "")
    updated_at_date_gte = request.GET.get('last_update_gte', "1000-05-06")
    updated_at_date_lte = request.GET.get('last_update_lte', "9999-05-06")
    # page perpage order by treba skontrolovat ci nedosla nejaka hlupost

    if not page.isdigit() or int(page) < 0:
        page = "1"

    if not per_page.isdigit() or int(per_page) < 0:
        per_page = "10"

    if not date_validator(updated_at_date_gte):
        updated_at_date_gte = "1000-05-06"

    if not date_validator(updated_at_date_lte):
        updated_at_date_lte = "9999-05-06"

    if date_validator(updated_at_date_gte):
        updated_at_date_gte = updated_at_date_gte[0:10]

    if date_validator(updated_at_date_lte):
        updated_at_date_lte = updated_at_date_lte[0:10]

    offset = (int(page) - 1) * int(per_page)
    limit = int(per_page)

    # sem ratam ked query je prazdne
    if query == "":
        if updated_at_date_gte == "1000-05-06" and updated_at_date_lte == "9999-05-06":
            all_companies_count = Companies.objects.all().count()
            pocet_zaznamov = all_companies_count

            all_companies = Companies.objects.annotate(or_podanie_issues_count=Count('orpodanieissues'),
                                                       znizenie_imania_issues_count=Count('znizenieimaniaissues'),
                                                       likvidator_issues_count=Count('likvidatorissues'),
                                                       konkurz_vyrovnanie_issues_count=Count('konkurzvyrovnanieissues'),
                                                       konkurz_restrukturalizacia_actors_count=Count(
                                                           'konkurzrestrukturalizaciaactors')
                                                       ).values('cin', 'name', 'br_section', 'address_line',
                                                                'last_update',
                                                                'or_podanie_issues_count',
                                                                'znizenie_imania_issues_count',
                                                                'likvidator_issues_count',
                                                                'konkurz_vyrovnanie_issues_count',
                                                                'konkurz_restrukturalizacia_actors_count').order_by(order_by)[
                            offset:limit]

        else:
            updated_at_date_gte = pytz.utc.localize(datetime.strptime(updated_at_date_gte, '%Y-%m-%d'))
            updated_at_date_lte = pytz.utc.localize(datetime.strptime(updated_at_date_lte, '%Y-%m-%d'))
            all_companies_count = Companies.objects.all().filter(last_update__gte=updated_at_date_gte,
                                                                 last_update__lte=updated_at_date_lte).count()
            pocet_zaznamov = all_companies_count

            all_companies = Companies.objects.annotate(or_podanie_issues_count=Count('orpodanieissues'),
                                                       znizenie_imania_issues_count=Count('znizenieimaniaissues'),
                                                       likvidator_issues_count=Count('likvidatorissues'),
                                                       konkurz_vyrovnanie_issues_count=Count('konkurzvyrovnanieissues'),
                                                       konkurz_restrukturalizacia_actors_count=Count(
                                                           'konkurzrestrukturalizaciaactors')
                                                       ).values('cin', 'name', 'br_section', 'address_line', 'last_update',
                                                                'or_podanie_issues_count', 'znizenie_imania_issues_count',
                                                                'likvidator_issues_count',
                                                                'konkurz_vyrovnanie_issues_count',
                                                                'konkurz_restrukturalizacia_actors_count').filter(
                last_update__gte=updated_at_date_gte, last_update__lte=updated_at_date_lte).order_by(order_by)[offset:limit]

    else:
        if updated_at_date_gte == "1000-05-06" and updated_at_date_lte == "9999-05-06":
            all_companies_count = Companies.objects.all().filter(
                Q(name__icontains=query) | Q(address_line__icontains=query)).count()
            pocet_zaznamov = all_companies_count

            all_companies = Companies.objects.annotate(or_podanie_issues_count=Count('orpodanieissues'),
                                                       znizenie_imania_issues_count=Count('znizenieimaniaissues'),
                                                       likvidator_issues_count=Count('likvidatorissues'),
                                                       konkurz_vyrovnanie_issues_count=Count('konkurzvyrovnanieissues'),
                                                       konkurz_restrukturalizacia_actors_count=Count(
                                                           'konkurzrestrukturalizaciaactors')
                                                       ).values('cin', 'name', 'br_section', 'address_line', 'last_update',
                                                                'or_podanie_issues_count', 'znizenie_imania_issues_count',
                                                                'likvidator_issues_count',
                                                                'konkurz_vyrovnanie_issues_count',
                                                                'konkurz_restrukturalizacia_actors_count').filter(
                Q(name__icontains=query) | Q(address_line__icontains=query)).order_by(order_by)[offset:limit]
        else:
            updated_at_date_gte = pytz.utc.localize(datetime.strptime(updated_at_date_gte, '%Y-%m-%d'))
            updated_at_date_lte = pytz.utc.localize(datetime.strptime(updated_at_date_lte, '%Y-%m-%d'))
            all_companies_count = Companies.objects.all().filter(
                Q(name__icontains=query) | Q(address_line__icontains=query),
                Q(last_update__gte=updated_at_date_gte), Q(last_update__lte=updated_at_date_lte)).count()
            pocet_zaznamov = all_companies_count

            all_companies = Companies.objects.annotate(or_podanie_issues_count=Count('orpodanieissues'),
                                                       znizenie_imania_issues_count=Count('znizenieimaniaissues'),
                                                       likvidator_issues_count=Count('likvidatorissues'),
                                                       konkurz_vyrovnanie_issues_count=Count('konkurzvyrovnanieissues'),
                                                       konkurz_restrukturalizacia_actors_count=Count(
                                                           'konkurzrestrukturalizaciaactors')
                                                       ).values('cin', 'name', 'br_section', 'address_line',
                                                                'last_update',
                                                                'or_podanie_issues_count',
                                                                'znizenie_imania_issues_count',
                                                                'likvidator_issues_count',
                                                                'konkurz_vyrovnanie_issues_count',
                                                                'konkurz_restrukturalizacia_actors_count').filter(
                Q(name__icontains=query) | Q(address_line__icontains=query),
                last_update__gte=updated_at_date_gte, last_update__lte=updated_at_date_lte).order_by(order_by)[
                            offset:limit]

    list_dictionary = []

    if not all_companies:
        metadata_dictionary = {
            "page": page,
            "per_page": per_page,
            "pages": ceil(pocet_zaznamov / int(per_page)),
            "total": pocet_zaznamov
        }
        final_dictionary = {
            "items": list_dictionary,
            "metadata": metadata_dictionary
        }

    else:
        for x in all_companies:
            items_dictionary = {
                "cin": x["cin"],
                "name": x["name"],
                "br_section": x["br_section"],
                "address_line": x["address_line"],
                "last_update": x["last_update"],
                "or_podanie_issues_count": x["or_podanie_issues_count"],
                "znizenie_imania_issues_count": x["znizenie_imania_issues_count"],
                "likvidator_issues_count": x["likvidator_issues_count"],
                "konkurz_vyrovnanie_issues_count": x["konkurz_vyrovnanie_issues_count"],
                "konkurz_restrukturalizacia_actors_count": x["konkurz_restrukturalizacia_actors_count"],
            }
            list_dictionary.append(items_dictionary)
        metadata_dictionary = {
            "page": page,
            "per_page": per_page,
            "pages": ceil(pocet_zaznamov / int(per_page)),
            "total": pocet_zaznamov
        }
        final_dictionary = {
            "items": list_dictionary,
            "metadata": metadata_dictionary
        }
    return final_dictionary


@csrf_exempt
def index(request):
    if request.method == 'GET':
        pass
        dictionary = get_companies(request)
        return JsonResponse(dictionary)
