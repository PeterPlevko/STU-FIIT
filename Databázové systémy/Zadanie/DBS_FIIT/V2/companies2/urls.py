from django.urls import path
from V2.companies2 import views

urlpatterns = [
    path('', views.index),
]
