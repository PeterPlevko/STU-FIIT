from django.urls import path, include
from health import views

urlpatterns = [
    path('', views.request_parameter),

]