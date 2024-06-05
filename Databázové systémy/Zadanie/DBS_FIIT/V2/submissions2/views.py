from math import ceil
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
import json
from django.utils import timezone
from datetime import datetime

from django.views.decorators.csrf import csrf_exempt

from V2.companies2.models import OrPodanieIssues, BulletinIssues, RawIssues


def date_validator(date_str):
    try:
        datetime.fromisoformat(date_str)
    except ValueError:
        return False
    return True


def get_method(request):
    white_list = ["id", "bulletin_issue_id", "raw_issue_id", "br_mark", "br_court_code", "kind_code", "kind_name",
                  "cin", "registration_date", "corporate_body_name", "br_section", "br_insertion", "text", "created_at",
                  "updated_at", "address_line", "street", "postal_code", "city"]
    white_list_1 = ["DESC", "ASC"]
    page = request.GET.get('page', "1")
    per_page = request.GET.get('per_page', "10")
    order_by = request.GET.get('order_by', "id")
    order_type = request.GET.get('order_type', "DESC")
    if order_by not in white_list:
        order_by = "id"
    if order_type not in white_list_1:
        order_type = "DESC"
    if order_type == "DESC":
        order_by = "-" + order_by[0:]
    if order_type == "ASC":
        order_by = "+" + order_by[0:]
    query = request.GET.get('query', "")
    registration_date_gte = request.GET.get('registration_date_gte', "1000-05-06")
    registration_date_lte = request.GET.get('registration_date_lte', "9999-05-06")
    # page perpage order by treba skontrolovat ci nedosla nejaka hlupost
    if not page.isdigit() or int(page) < 0:
        page = "1"

    if not per_page.isdigit() or int(per_page) < 0:
        per_page = "10"

    if not date_validator(registration_date_gte):
        registration_date_gte = "1000-05-06"

    if not date_validator(registration_date_lte):
        registration_date_lte = "9999-05-06"

    if date_validator(registration_date_gte):
        registration_date_gte = registration_date_gte[0:10]

    if date_validator(registration_date_lte):
        registration_date_lte = registration_date_lte[0:10]

    offset = (int(page) - 1) * int(per_page)
    limit = int(per_page) * int(page)

    if query == "":
        if registration_date_gte == "1000-05-06" and registration_date_lte == "9999-05-06":
            pocet = OrPodanieIssues.objects.all().count()
            items = OrPodanieIssues.objects.all().order_by(order_by)[offset:limit]

        else:
            pocet = OrPodanieIssues.objects.all().filter(Q(registration_date__gte=registration_date_gte),
                                                   Q(registration_date__lte=registration_date_lte)).count()

            items = OrPodanieIssues.objects.all().filter(
                Q(registration_date__gte=registration_date_gte),
                Q(registration_date__lte=registration_date_lte))[offset:limit]
    else:
        if registration_date_gte == "1000-05-06" and registration_date_lte == "9999-05-06":
            pocet = OrPodanieIssues.objects.all().filter(Q(corporate_body_name__icontains=query) |
                                                   Q(cin__icontains=query) | Q(city__icontains=query)).count()

            # toto vrati zaznamy
            items = OrPodanieIssues.objects.all().order_by(order_by).filter(
                Q(corporate_body_name__icontains=query) | Q(cin__icontains=query) | Q(city__icontains=query))[
                    offset:limit]
        else:
            pocet = OrPodanieIssues.objects.all().filter(
                Q(corporate_body_name__icontains=query) | Q(cin__icontains=query) | Q(city__icontains=query),
                Q(registration_date__gte=registration_date_gte),
                Q(registration_date__lte=registration_date_lte)).count()
            items = OrPodanieIssues.objects.all().order_by(order_by).filter(
                Q(corporate_body_name__icontains=query) | Q(cin__icontains=query) | Q(city__icontains=query),
                Q(registration_date__gte=registration_date_gte), Q(registration_date__lte=registration_date_lte))[
                    offset:limit]

    list_dictionary = []

    if not items:
        metadata_dictionary = {
            "page": page,
            "per_page": per_page,
            "pages": ceil(pocet / int(per_page)),
            "total": pocet
        }
        final_dictionary = {
            "items": list_dictionary,
            "metadata": metadata_dictionary
        }
    else:
        for x in items:
            items_dictionary = {
                "id": x.id,
                "br_court_name": x.br_court_name,
                "kind_name": x.kind_name,
                "cin": x.cin,
                "registration_date": x.registration_date,
                "corporate_body_name": x.corporate_body_name,
                "br_section": x.br_section,
                "text": x.text,
                "street": x.street,
                "postal_code": x.postal_code,
                "city": x.city
            }
            list_dictionary.append(items_dictionary)

        metadata_dictionary = {
            "page": page,
            "per_page": per_page,
            "pages": ceil(pocet / int(per_page)),
            "total": pocet
        }
        final_dictionary = {
            "items": list_dictionary,
            "metadata": metadata_dictionary
        }

    return final_dictionary


def get_method_id(request, get_id):
    temp = OrPodanieIssues.objects.filter(id=get_id)
    if len(temp) == 0:
        dictionary = {
            "error": {"message": "Záznam neexistuje"}
        }
        return dictionary, "404"
    get = OrPodanieIssues.objects.filter(pk=get_id)[0]
    items_dictionary = {
        "id": get.id,
        "br_court_name": get.br_court_name,
        "kind_name": get.kind_name,
        "cin": get.cin,
        "registration_date": get.registration_date,
        "corporate_body_name": get.corporate_body_name,
        "br_section": get.br_section,
        "br_insertion": get.br_insertion,
        "text": get.text,
        "street": get.street,
        "postal_code": get.postal_code,
        "city": get.city
        }
    final_dictionary = {
        "response": items_dictionary,
    }
    return final_dictionary, "200"


def post_method(request):
    final_error_dict = {}
    pole_error = []
    a = json.loads(request.body)
    for x in a:
        pole_reasons = []
        error_dict = {}

        if a.get(x) == "":
            error_dict["field"] = x
            pole_reasons.append("required")
            error_dict["reasons"] = pole_reasons
            pole_error.append(error_dict)

        elif not isinstance(a.get(x), str) and x != "cin":
            error_dict["field"] = x
            pole_reasons.append("not string")
            error_dict["reasons"] = pole_reasons
            pole_error.append(error_dict)

        else:
            if x == "cin":
                if not isinstance(a.get(x), int):
                    error_dict["field"] = x

                    pole_reasons.append("not_number")
                    error_dict["reasons"] = pole_reasons
                    pole_error.append(error_dict)
            if x == "registration_date":
                if not date_validator(a.get(x)):
                    error_dict["field"] = x
                    pole_reasons.append("invalid_range")
                    error_dict["reasons"] = pole_reasons
                    pole_error.append(error_dict)

    final_error_dict["errors"] = pole_error
    if len(final_error_dict.get("errors")) != 0:
        return final_error_dict, "422"

    time_stamp = timezone.now().isoformat()
    year = timezone.now().year
    published_at_is = timezone.now()
    published_at_is = published_at_is.replace(hour=0, minute=0, second=0, microsecond=0)

    registration_date = a.get('registration_date')
    registration_date = registration_date[:10]

    # vypocitam si number v bulletin issues
    order_number = BulletinIssues.objects.order_by('-number').filter(year=registration_date[0:4])[0].number
    order_number += 1

    # vypocitam si number v bulletin issues
    temp = BulletinIssues(year=year, number=order_number, published_at=published_at_is, created_at=time_stamp,
                          updated_at=time_stamp)
    temp.save()

    # ziskam id tohto novo vlozeneho prvku
    ov_bulletin_issues_id = BulletinIssues.objects.filter(year=year, number=order_number)[0].id

    # vlozim do tabulky or_raw_issues
    temp = RawIssues(bulletin_issue_id=ov_bulletin_issues_id, file_name=a.get('kind_name'), content=None,
                     created_at=time_stamp, updated_at=time_stamp)
    temp.save()

    # mam vypocitane ov_bulletin_issues_id
    ov_raw_issues_id = RawIssues.objects.filter(bulletin_issue_id=ov_bulletin_issues_id)[0].id

    # sem zacinam s or_podanie_issues
    # street code city
    address_line = a.get("street") + ", " + a.get("postal_code") + " " + a.get("city")

    temp = OrPodanieIssues(bulletin_issue_id=ov_bulletin_issues_id, raw_issue_id=ov_raw_issues_id, br_mark="-",
                           br_court_code="-", br_court_name=a.get("br_court_name"), kind_code=a.get("kind_name"),
                           kind_name=a.get("kind_name"), cin=a.get("cin"),
                           registration_date=a.get("registration_date")[:10],
                           corporate_body_name=a.get("corporate_body_name"), br_section=a.get("br_section"),
                           br_insertion=a.get("br_insertion"), text=a.get("text"), address_line=address_line,
                           street=a.get("street"), postal_code=a.get("postal_code"), city=a.get("city"),
                           created_at=time_stamp, updated_at=time_stamp)
    temp.save()
    # zistim id v or_podanie_issues
    ov_or_podanie_issues = \
        OrPodanieIssues.objects.filter(bulletin_issue_id=ov_bulletin_issues_id, raw_issue_id=ov_raw_issues_id)[0].id

    a["id"] = ov_or_podanie_issues

    finalny_dict = {"id": a.get("id"), "br_court_name": a.get("br_court_name"), "kind_name": a.get("kind_name"),
                    "cin": a.get("cin"), "registration_date": a.get("registration_date"),
                    "corporate_body_name": a.get("corporate_body_name"), "br_section": a.get("br_section"),
                    "text": a.get("text"), "street": a.get("street"), "postal_code": a.get("postal_code"),
                    "city": a.get("city")}

    nested_finalny_dict = {"response": finalny_dict}

    return nested_finalny_dict, "201"


def put_method(request, post_id):
    temp = OrPodanieIssues.objects.filter(id=post_id)
    if len(temp) == 0:
        dictionary = {
            "error": {"message": "Záznam neexistuje"}
        }
        return dictionary, "404"

    final_error_dict = {}
    pole_error = []
    a = json.loads(request.body)

    for x in a:
        pole_reasons = []
        error_dict = {}
        if a.get(x) == "":
            error_dict["field"] = x
            pole_reasons.append("required")
            error_dict["reasons"] = pole_reasons
            pole_error.append(error_dict)
        elif not isinstance(a.get(x), str) and x != "cin" and x!= "id" and x!= "registration_date":
            error_dict["field"] = x
            pole_reasons.append("not string")
            error_dict["reasons"] = pole_reasons
            pole_error.append(error_dict)
        else:
            if x == "cin":
                if not isinstance(a.get(x), int):
                    error_dict["field"] = x
                    pole_reasons.append("not_number")
                    error_dict["reasons"] = pole_reasons
                    pole_error.append(error_dict)
            if x == "registration_date":
                if isinstance(a.get(x), dict):
                    error_dict["field"] = x
                    pole_reasons.append("invalid_range")
                    error_dict["reasons"] = pole_reasons
                    pole_error.append(error_dict)
                elif not date_validator(a.get(x)):
                    error_dict["field"] = x
                    pole_reasons.append("invalid_range")
                    error_dict["reasons"] = pole_reasons
                    pole_error.append(error_dict)

    final_error_dict["errors"] = pole_error
    if len(final_error_dict.get("errors")) != 0:
        return final_error_dict, "422"

    for x in a:
        OrPodanieIssues.objects.filter(pk=post_id).update(**{x: a.get(x)})

    OrPodanieIssues.objects.filter(pk=post_id).update(**{'updated_at': timezone.now()})

    get = OrPodanieIssues.objects.filter(pk=post_id)[0]

    items_dictionary = {
        "id": get.id,
        "br_court_name": get.br_court_name,
        "kind_name": get.kind_name,
        "cin": get.cin,
        "registration_date": get.registration_date,
        "corporate_body_name": get.corporate_body_name,
        "br_section": get.br_section,
        "br_insertion": get.br_insertion,
        "text": get.text,
        "street": get.street,
        "postal_code": get.postal_code,
        "city": get.city
    }
    final_dictionary = {
        "response": items_dictionary,
    }
    return final_dictionary, "201"


def delete_method(request, id_to_del):
    temp = OrPodanieIssues.objects.filter(id=id_to_del)
    if len(temp) == 0:
        dictionary = {
            "error": {"message": "Záznam neexistuje"}
        }
        return dictionary, "404"

    bulletin_issues_id = temp[0].bulletin_issue_id
    raw_issue_id = temp[0].raw_issue_id

    number_of_bulletin_issues_id = OrPodanieIssues.objects.filter(bulletin_issue_id=bulletin_issues_id).count()

    number_of_raw_issue_id = OrPodanieIssues.objects.filter(raw_issue_id=raw_issue_id).count()

    # situacia ked je len jeden mam zratany pocet vyskitov v or_podanie_issues teraz sa idem pozriet kolko
    # bulletin_issue_id sa nachadza v raw_issue

    number_of_buletin_issue_ocurences_in_raw_issues = RawIssues.objects.filter(
        bulletin_issue_id=bulletin_issues_id).count()

    # vymazem or podanie issues vzdy to robi toto
    item_to_del = OrPodanieIssues.objects.filter(id=id_to_del)
    item_to_del.delete()

    if number_of_raw_issue_id == 1 and number_of_bulletin_issues_id == 1:

        item_to_del = RawIssues.objects.filter(id=raw_issue_id)
        item_to_del.delete()

        if number_of_buletin_issue_ocurences_in_raw_issues == 1:
            item_to_del = BulletinIssues.objects.filter(id=bulletin_issues_id)
            item_to_del.delete()
    return "204"


@csrf_exempt
def choose_type(request, status_id=0):
    if request.method == 'GET' and status_id == 0:
        dictionary = get_method(request)
        return JsonResponse(dictionary)
    if request.method == 'GET' and status_id != 0:
        dictionary = get_method_id(request, status_id)
        return JsonResponse(dictionary[0], status=dictionary[1])
    if request.method == 'POST':
        dictionary = post_method(request)
        return JsonResponse(dictionary[0], status=dictionary[1])
    if request.method == 'DELETE':
        dictionary = delete_method(request, status_id)
        if isinstance(dictionary, str):
            return HttpResponse(status=dictionary)
        else:
            return JsonResponse(dictionary[0], status=dictionary[1])
    if request.method == 'PUT':
        dictionary = put_method(request, status_id)
        return JsonResponse(dictionary[0], status=dictionary[1])
