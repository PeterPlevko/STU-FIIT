from datetime import datetime
from math import ceil
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


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
    order_by = request.GET.get('order_by', "cin")
    order_type = request.GET.get('order_type', "DESC")
    query = request.GET.get('query', "")
    updated_at_date_gte = request.GET.get('last_update_gte', "1000-05-06")
    updated_at_date_lte = request.GET.get('last_update_lte', "9999-05-06")
    # page perpage order by treba skontrolovat ci nedosla nejaka hlupost
    if not page.isdigit() or int(page) < 0:
        page = "1"

    if not per_page.isdigit() or int(per_page) < 0:
        per_page = "10"

    if order_by not in white_list:
        order_by = "cin"

    if order_type not in white_list_1:
        order_type = "DESC"

    if date_validator(updated_at_date_gte) == False:
        updated_at_date_gte = "1000-05-06"

    if date_validator(updated_at_date_lte) == False:
        updated_at_date_lte = "9999-05-06"

    if date_validator(updated_at_date_gte) == True:
        updated_at_date_gte = updated_at_date_gte[0:10]

    if date_validator(updated_at_date_lte) == True:
        updated_at_date_gte = updated_at_date_gte[0:10]

    # sem ratam ked query je prazdne
    if query == "":

        # toto mi vypocita metadata
        cursor = connection.cursor()
        cursor.execute(f"""
                WITH podanie AS(
                SELECT podanie.cin as podanie_cin, count(*) as count_podanie
                from ov.or_podanie_issues podanie, ov.companies companies
                where podanie.cin = companies.cin
                group by podanie.cin
                 )
                 , znizenie AS(
                    SELECT znizenie.cin as znizenie_cin, count(*) as count_znizenie
                    from ov.znizenie_imania_issues znizenie, ov.companies companies
                    where znizenie.cin = companies.cin
                    group by znizenie.cin
                )
                , likvidator AS(
                    SELECT likvidator.cin as likvidator_cin, count(*) as count_likvidator
                    from ov.likvidator_issues likvidator, ov.companies companies
                    where likvidator.cin = companies.cin
                    group by likvidator.cin
                )
                , vyrovnanie AS(
                    SELECT vyrovnanie.cin as vyrovnanie_cin, count(*) as count_vyrovnanie
                    from ov.konkurz_vyrovnanie_issues vyrovnanie, ov.companies companies
                    where vyrovnanie.cin = companies.cin
                    group by vyrovnanie.cin
                )
                , restrukturalizacia AS(

                    SELECT restrukturalizacia.cin as restrukturalizacia_cin, count(*) as count_restrukturalizacia
                    from ov.konkurz_restrukturalizacia_actors restrukturalizacia, ov.companies companies
                    where restrukturalizacia.cin = companies.cin
                    group by restrukturalizacia.cin
                )
            -- sem vyskladat tu query
                SELECT cin, name, br_section, address_line, last_update, created_at, updated_at, count_podanie, count_znizenie, count_likvidator, count_vyrovnanie, count_restrukturalizacia
                from ov.companies
                left join podanie on ov.companies.cin = podanie_cin
                left join znizenie on ov.companies.cin = znizenie_cin
                left join likvidator on ov.companies.cin = likvidator_cin
                left join vyrovnanie on ov.companies.cin = vyrovnanie_cin
                left join restrukturalizacia on ov.companies.cin = restrukturalizacia_cin
                WHERE (
                (last_update >= %s) and (last_update <= %s))
                ORDER BY {order_by} {order_type}
                ;
                """, (updated_at_date_gte, updated_at_date_lte,))
        row = cursor.fetchall()
        pocet_zaznamov = len(row)

        # toto mi vrati vsetky zaznamy
        cursor = connection.cursor()
        cursor.execute(f"""
                    WITH podanie AS(
                    SELECT podanie.cin as podanie_cin, count(*) as count_podanie
                    from ov.or_podanie_issues podanie, ov.companies companies
                    where podanie.cin = companies.cin
                    group by podanie.cin
                     )
                     , znizenie AS(
                        SELECT znizenie.cin as znizenie_cin, count(*) as count_znizenie
                        from ov.znizenie_imania_issues znizenie, ov.companies companies
                        where znizenie.cin = companies.cin
                        group by znizenie.cin
                    )
                    , likvidator AS(
                        SELECT likvidator.cin as likvidator_cin, count(*) as count_likvidator
                        from ov.likvidator_issues likvidator, ov.companies companies
                        where likvidator.cin = companies.cin
                        group by likvidator.cin
                    )
                    , vyrovnanie AS(
                        SELECT vyrovnanie.cin as vyrovnanie_cin, count(*) as count_vyrovnanie
                        from ov.konkurz_vyrovnanie_issues vyrovnanie, ov.companies companies
                        where vyrovnanie.cin = companies.cin
                        group by vyrovnanie.cin
                    )
                    , restrukturalizacia AS(

                        SELECT restrukturalizacia.cin as restrukturalizacia_cin, count(*) as count_restrukturalizacia
                        from ov.konkurz_restrukturalizacia_actors restrukturalizacia, ov.companies companies
                        where restrukturalizacia.cin = companies.cin
                        group by restrukturalizacia.cin
                    )
                -- sem vyskladat tu query
                    SELECT cin, name, br_section, address_line, last_update, created_at, updated_at, count_podanie, count_znizenie, count_likvidator, count_vyrovnanie, count_restrukturalizacia
                    from ov.companies
                    left join podanie on ov.companies.cin = podanie_cin
                    left join znizenie on ov.companies.cin = znizenie_cin
                    left join likvidator on ov.companies.cin = likvidator_cin
                    left join vyrovnanie on ov.companies.cin = vyrovnanie_cin
                    left join restrukturalizacia on ov.companies.cin = restrukturalizacia_cin
                    WHERE (
                     (last_update >= %s) and (last_update <= %s))
                    ORDER BY {order_by} {order_type}
                    OFFSET %s 
                    LIMIT %s ;""", (
        updated_at_date_gte, updated_at_date_lte, (int(page) - 1) * int(per_page), int(per_page)))
        row = cursor.fetchall()



    # sem idem ked query existuje
    else:
        # toto mi vypocita metadata
        cursor = connection.cursor()
        cursor.execute(f"""
        WITH podanie AS(
        SELECT podanie.cin as podanie_cin, count(*) as count_podanie
        from ov.or_podanie_issues podanie, ov.companies companies
        where podanie.cin = companies.cin
        group by podanie.cin
         )
         , znizenie AS(
            SELECT znizenie.cin as znizenie_cin, count(*) as count_znizenie
            from ov.znizenie_imania_issues znizenie, ov.companies companies
            where znizenie.cin = companies.cin
            group by znizenie.cin
        )
        , likvidator AS(
            SELECT likvidator.cin as likvidator_cin, count(*) as count_likvidator
            from ov.likvidator_issues likvidator, ov.companies companies
            where likvidator.cin = companies.cin
            group by likvidator.cin
        )
        , vyrovnanie AS(
            SELECT vyrovnanie.cin as vyrovnanie_cin, count(*) as count_vyrovnanie
            from ov.konkurz_vyrovnanie_issues vyrovnanie, ov.companies companies
            where vyrovnanie.cin = companies.cin
            group by vyrovnanie.cin
        )
        , restrukturalizacia AS(
    
            SELECT restrukturalizacia.cin as restrukturalizacia_cin, count(*) as count_restrukturalizacia
            from ov.konkurz_restrukturalizacia_actors restrukturalizacia, ov.companies companies
            where restrukturalizacia.cin = companies.cin
            group by restrukturalizacia.cin
        )
    -- sem vyskladat tu query
        SELECT cin, name, br_section, address_line, last_update, created_at, updated_at, count_podanie, count_znizenie, count_likvidator, count_vyrovnanie, count_restrukturalizacia
        from ov.companies
        left join podanie on ov.companies.cin = podanie_cin
        left join znizenie on ov.companies.cin = znizenie_cin
        left join likvidator on ov.companies.cin = likvidator_cin
        left join vyrovnanie on ov.companies.cin = vyrovnanie_cin
        left join restrukturalizacia on ov.companies.cin = restrukturalizacia_cin
        WHERE (
        (name ~* %s OR address_line ~* %s) and (last_update >= %s) and (last_update <= %s))
        ORDER BY {order_by} {order_type}
        ;
        """, (query, query, updated_at_date_gte, updated_at_date_lte,))
        row = cursor.fetchall()
        pocet_zaznamov = len(row)

        # toto mi vrati vsetky zaznamy
        cursor = connection.cursor()
        cursor.execute(f"""
            WITH podanie AS(
            SELECT podanie.cin as podanie_cin, count(*) as count_podanie
            from ov.or_podanie_issues podanie, ov.companies companies
            where podanie.cin = companies.cin
            group by podanie.cin
             )
             , znizenie AS(
                SELECT znizenie.cin as znizenie_cin, count(*) as count_znizenie
                from ov.znizenie_imania_issues znizenie, ov.companies companies
                where znizenie.cin = companies.cin
                group by znizenie.cin
            )
            , likvidator AS(
                SELECT likvidator.cin as likvidator_cin, count(*) as count_likvidator
                from ov.likvidator_issues likvidator, ov.companies companies
                where likvidator.cin = companies.cin
                group by likvidator.cin
            )
            , vyrovnanie AS(
                SELECT vyrovnanie.cin as vyrovnanie_cin, count(*) as count_vyrovnanie
                from ov.konkurz_vyrovnanie_issues vyrovnanie, ov.companies companies
                where vyrovnanie.cin = companies.cin
                group by vyrovnanie.cin
            )
            , restrukturalizacia AS(
    
                SELECT restrukturalizacia.cin as restrukturalizacia_cin, count(*) as count_restrukturalizacia
                from ov.konkurz_restrukturalizacia_actors restrukturalizacia, ov.companies companies
                where restrukturalizacia.cin = companies.cin
                group by restrukturalizacia.cin
            )
        -- sem vyskladat tu query
            SELECT cin, name, br_section, address_line, last_update, created_at, updated_at, count_podanie, count_znizenie, count_likvidator, count_vyrovnanie, count_restrukturalizacia
            from ov.companies
            left join podanie on ov.companies.cin = podanie_cin
            left join znizenie on ov.companies.cin = znizenie_cin
            left join likvidator on ov.companies.cin = likvidator_cin
            left join vyrovnanie on ov.companies.cin = vyrovnanie_cin
            left join restrukturalizacia on ov.companies.cin = restrukturalizacia_cin
            WHERE (
            (name ~* %s OR address_line ~* %s) and (last_update >= %s) and (last_update <= %s))
            ORDER BY {order_by} {order_type}
            OFFSET %s 
            LIMIT %s ;""", (query, query, updated_at_date_gte, updated_at_date_lte, (int(page) - 1) * int(per_page), int(per_page)))
        row = cursor.fetchall()

    list_dictionary = []

    if not row:
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
        for x in row:
            items_dictionary = {
                "cin": x[0],
                "name": x[1],
                "br_section": x[2],
                "address_line": x[3],
                "last_update": x[4],
                "or_podanie_issues_count": x[7],
                "znizenie_imania_issues_count": x[8],
                "likvidator_issues_count": x[9],
                "konkurz_vyrovnanie_issues_count": x[10],
                "konkurz_restrukturalizacia_actors_count": x[11],
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
        dictionary = get_companies(request)
        return JsonResponse(dictionary)
