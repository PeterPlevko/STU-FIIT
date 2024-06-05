from math import ceil
from django.db import connection
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

from datetime import datetime, date, time


def date_validator(date_str):
    try:
        datetime.fromisoformat(date_str)
    except ValueError:
        return False
    return True


def get_method(request):
    white_list = ["id", "bulletin_issue_id", "raw_issue_id", "br_mark", "br_court_code", "kind_code", "kind_name", "cin", "registration_date", "corporate_body_name", "br_section", "br_insertion", "text", "created_at", "updated_at", "address_line", "street", "postal_code", "city"]
    white_list_1 = ["DESC", "ASC"]
    page = request.GET.get('page', "1")
    per_page = request.GET.get('per_page', "10")
    order_by = request.GET.get('order_by', "id")
    order_type = request.GET.get('order_type', "DESC")
    query = request.GET.get('query', "")
    registration_date_gte = request.GET.get('registration_date_gte', "1000-05-06")
    registration_date_lte = request.GET.get('registration_date_lte', "9999-05-06")
# page perpage order by treba skontrolovat ci nedosla nejaka hlupost
    if not page.isdigit() or int(page) < 0:
        page = "1"

    if not per_page.isdigit() or int(per_page) < 0:
        per_page = "10"

    if order_by not in white_list:
        order_by = "id"
    if order_type not in white_list_1:
        order_type = "DESC"

    if date_validator(registration_date_gte) == False:
        registration_date_gte = "1000-05-06"

    if date_validator(registration_date_lte) == False:
        registration_date_lte = "9999-05-06"

    if date_validator(registration_date_gte) == True:
        registration_date_gte = registration_date_gte[0:10]

    if date_validator(registration_date_lte) == True:
        registration_date_gte = registration_date_gte[0:10]

    # toto je query ktora funguje ked uzivatel nezadal datum pretoze ked nezadal datum
    # da sa mi tam defaultna hodnota 1000 a to preskoci null datumy
    # toto vypocita celkovy pocet vyskitov daneho retazca metadata
    if registration_date_gte == "1000-05-06":
        cursor = connection.cursor()
        cursor.execute(f"""select count(id)
                           FROM ov.or_podanie_issues 
                           WHERE (corporate_body_name ~* %s OR cin::text ~* %s OR city ~* %s);""",
                       (query, query, query))
        row = cursor.fetchall()
        pocet = row[0][0]

        # toto vrati zaznamy
        cursor.execute(f"""select id, br_court_name, kind_name, cin, registration_date, corporate_body_name, br_section,
                              br_insertion, text, street, postal_code, city 
                              FROM ov.or_podanie_issues 
                              WHERE (corporate_body_name ~* %s OR cin::text ~* %s OR city ~* %s) 
                              ORDER BY {order_by} {order_type} 
                              OFFSET %s  
                              LIMIT %s ;""", (
            query, query, query, (int(page) - 1) * int(per_page),
            int(per_page)))
        row = cursor.fetchall()

    else:
        # toto je query ktora rata veci z datumom ked je dobre zadany
        cursor = connection.cursor()
        cursor.execute(f"""select count(id)
                              FROM ov.or_podanie_issues 
                              WHERE (corporate_body_name ~* %s OR cin::text ~* %s OR city ~* %s) and
                               (registration_date >= %s) and (registration_date <= %s);""",
                       (query, query, query, registration_date_gte, registration_date_lte))
        row = cursor.fetchall()
        pocet = row[0][0]
        # toto vypocita celkovy pocet vyskitov daneho retazca

        cursor.execute(f"""select id, br_court_name, kind_name, cin, registration_date, corporate_body_name, br_section,
                        br_insertion, text, street, postal_code, city 
                          FROM ov.or_podanie_issues 
                          WHERE (corporate_body_name ~* %s OR cin::text ~* %s OR city ~* %s) and 
                          (registration_date >= %s) and (registration_date <= %s) 
                          ORDER BY {order_by} {order_type} 
                          OFFSET %s  
                          LIMIT %s ;""", (
            query, query, query, registration_date_gte, registration_date_lte, (int(page) - 1) * int(per_page),
            int(per_page)))
        row = cursor.fetchall()

    final_dictionary = {
    }
    list_dictionary = []

    if not row:
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
        for x in row:
            items_dictionary = {
                "id": x[0],
                "br_court_name": x[1],
                "kind_name": x[2],
                "cin": x[3],
                "registration_date": x[4],
                "corporate_body_name": x[5],
                "br_section": x[6],
                "text": x[7],
                "street": x[8],
                "postal_code": x[9],
                "city": x[10]
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


def post_method(request):
    final_error_dict = {}
    error_dict = {}
    pole_error = []
    pole_reasons = []
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
                if date_validator(a.get(x)) == False:
                    error_dict["field"] = x
                    pole_reasons.append("invalid_range")
                    error_dict["reasons"] = pole_reasons
                    pole_error.append(error_dict)



    final_error_dict["errors"] = pole_error
    if len(final_error_dict.get("errors")) != 0:
        return final_error_dict, "422"

    cursor = connection.cursor()

    time_stamp = datetime.now().isoformat()
    year = date.today().year
    year_combine = date.today()
    time_combine = time()
    published_at_is = datetime.combine(year_combine, time_combine)

    registration_date = a.get('registration_date')
    registration_date = registration_date[:10]

    # sem zacinam s bulletin issues
    # vypocitam si number v bulletin issues
    cursor.execute(f"""SELECT number
        FROM ov.bulletin_issues
        WHERE  year = {registration_date[0:4]}
        ORDER BY number desc LIMIT 1;
    """)

    order_number = cursor.fetchall()
    order_number = int(order_number[0][0])
    order_number += 1
    # vypocitam si number v bulletin issues

    # vlozim zaznam do bulletin_issues
    cursor.execute(f"""INSERT INTO ov.bulletin_issues (year, number, published_at, created_at, updated_at)
                   VALUES (%s, %s,%s,%s,%s)
                   ;""", (year, order_number, published_at_is, time_stamp, time_stamp))

    # ziskam id tohto novo vlozeneho prvku
    cursor.execute(f"""SELECT ID 
                   FROM ov.bulletin_issues
                   WHERE year = {year} and number = {order_number}
        ;""")

    ov_bulletin_issues_id = cursor.fetchall()
    ov_bulletin_issues_id = int(ov_bulletin_issues_id[0][0])
    # mam vypocitane ov_bulletin_issues_id

    # vlozim do tabulky or_raw_issues
    cursor.execute(f"""INSERT INTO ov.raw_issues (bulletin_issue_id, file_name, content, created_at, updated_at)
                            VALUES (%s, %s, %s, %s, %s)
    ;""", (ov_bulletin_issues_id, a.get('kind_name'), None, time_stamp, time_stamp))
    # ziskam id tohto novo vlozeneho prvku
    cursor.execute(f"""SELECT id
           FROM ov.raw_issues
           WHERE bulletin_issue_id = {ov_bulletin_issues_id} 
       ;""")

    ov_raw_issues_id = cursor.fetchall()
    ov_raw_issues_id = int(ov_raw_issues_id[0][0])
    # mam vypocitane ov_bulletin_issues_id

    # sem zacinam s or_podanie_issues
    # street code city
    address_line = a.get("street") + ", " + a.get("postal_code") + " " + a.get("city")

    cursor.execute(f"""INSERT INTO ov.or_podanie_issues (bulletin_issue_id, raw_issue_id, br_mark, br_court_code,
                   br_court_name, kind_code, kind_name, cin, registration_date, corporate_body_name, br_section,
                    br_insertion, text, 
                   address_line, street, postal_code, city, created_at, updated_at )
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                   ;""", (
        ov_bulletin_issues_id, ov_raw_issues_id, "-", "-", a.get("br_court_name"), "-", a.get("kind_name"),
        a.get("cin"),
        a.get("registration_date")[:10], a.get("corporate_body_name"), a.get("br_section"), a.get("br_insertion"),
        a.get("text"),
        address_line, a.get("street"), a.get("postal_code"), a.get("city"), time_stamp, time_stamp,))
    # br_mark br_court_code             kind_code

    # zistim id v or_podanie_issues
    cursor.execute(f"""SELECT id
        FROM ov.or_podanie_issues
        WHERE bulletin_issue_id = {ov_bulletin_issues_id} and raw_issue_id = {ov_raw_issues_id}
    """)

    ov_or_podanie_issues = cursor.fetchall()
    ov_or_podanie_issues = int(ov_or_podanie_issues[0][0])

    a["id"] = ov_or_podanie_issues

    finalny_dict = {"id": a.get("id"), "br_court_name": a.get("br_court_name"), "kind_name": a.get("kind_name"),
                    "cin": a.get("cin"), "registration_date": a.get("registration_date"),
                    "corporate_body_name": a.get("corporate_body_name"), "br_section": a.get("br_section"),
                    "text": a.get("text"), "street": a.get("street"), "postal_code": a.get("postal_code"),
                    "city": a.get("city")}

    nested_finalny_dict = {"response": finalny_dict}

    return nested_finalny_dict, "201"


def delete_method(request, id_to_del):
    cursor = connection.cursor()

    cursor.execute(f"""SELECT bulletin_issue_id, raw_issue_id
       FROM ov.or_podanie_issues
       WHERE id = {id_to_del};
    """)

    data = cursor.fetchall()
    if len(data) == 0:
        dictionary = {
            "error": {"message": "Záznam neexistuje"}
        }
        return dictionary, "404"

    bulletin_issues_id = data[0][0]
    raw_issue_id = data[0][1]

    cursor.execute(f"""SELECT COUNT(bulletin_issue_id)
       FROM ov.or_podanie_issues
       WHERE bulletin_issue_id = {bulletin_issues_id}
    """)
    number_of_bulletin_issues_id = cursor.fetchall()
    number_of_bulletin_issues_id = number_of_bulletin_issues_id[0][0]

    cursor.execute(f"""SELECT COUNT(bulletin_issue_id)
       FROM ov.or_podanie_issues
       WHERE raw_issue_id = {raw_issue_id}
    """)
    number_of_raw_issue_id = cursor.fetchall()
    number_of_raw_issue_id = number_of_raw_issue_id[0][0]

    # situacia ked je len jeden mam zratany pocet vyskitov v or_podanie_issues teraz sa idem pozriet kolko
    # bulletin_issue_id sa nachadza v raw_issue

    cursor.execute(f"""SELECT COUNT(bulletin_issue_id)
       FROM ov.raw_issues
       WHERE bulletin_issue_id = {bulletin_issues_id}
    """)
    number_of_buletin_issue_ocurences_in_raw_issues = cursor.fetchall()
    number_of_buletin_issue_ocurences_in_raw_issues = number_of_buletin_issue_ocurences_in_raw_issues[0][0]

    # vymazem or podanie issues vzdy to robi toto
    cursor.execute(f"""DELETE
       FROM ov.or_podanie_issues
       WHERE id = {id_to_del}
    """)

    if number_of_raw_issue_id == 1 and number_of_bulletin_issues_id == 1:
        cursor.execute(f"""DELETE
           FROM ov.raw_issues
           WHERE id = {raw_issue_id}
        """)

        if number_of_buletin_issue_ocurences_in_raw_issues == 1:
            cursor.execute(f"""DELETE
               FROM ov.bulletin_issues
               WHERE id = {bulletin_issues_id}
            """)

    return "204"


@csrf_exempt
def choose_type(request, status_id=0):
    if request.method == 'GET':
        dictionary = get_method(request)
        return JsonResponse(dictionary)
    if request.method == 'POST':
        dictionary = post_method(request)
        return JsonResponse(dictionary[0], status=dictionary[1])
    if request.method == 'DELETE':
        dictionary = delete_method(request, status_id)
        if isinstance(dictionary, str):
            return HttpResponse(status=dictionary)
        else:
            return JsonResponse(dictionary[0], status=dictionary[1])
