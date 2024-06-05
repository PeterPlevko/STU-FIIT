from django.urls import path
from V2.submissions2 import views

urlpatterns = [
    path('', views.choose_type),
    path('<int:status_id>', views.choose_type, name="status_id"),
]