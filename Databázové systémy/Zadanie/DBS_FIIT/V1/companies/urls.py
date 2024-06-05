from django.urls import path
from V1.companies import views

urlpatterns = [
    path('', views.index),
]
