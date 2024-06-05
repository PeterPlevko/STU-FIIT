from django.db import connection
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.


def days_hours_minutes(td):
    return td.days, td.seconds//3600, (td.seconds//60) % 60, td.seconds % 60


def request_parameter(request):
    cursor = connection.cursor()
    cursor.execute("SELECT date_trunc('second', current_timestamp -pg_postmaster_start_time()) as uptime;")
    row = cursor.fetchone()

    days = row[0].days
    seconds = row[0].seconds
    hours = seconds // 3600
    minutes = (seconds // 60) % 60
    seconds = seconds % 60
    if str(days) == "1":
        final_time = str(days) + " day " + str(hours) + ":" + str(minutes) + ":" + str(seconds)
    else:
        final_time = str(days) + " days " + str(hours) + ":" + str(minutes) + ":" + str(seconds)

    nested_dict = {
     'pgsql': {'uptime': final_time}
    }

    return JsonResponse(nested_dict)
