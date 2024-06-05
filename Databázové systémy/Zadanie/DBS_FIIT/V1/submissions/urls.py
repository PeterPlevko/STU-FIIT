from django.urls import path
from V1.submissions import views


urlpatterns = [
    path('', views.choose_type),
    path('<int:status_id>', views.choose_type, name="status_id"),
]
