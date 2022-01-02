from .views import *
from knox import views as knox_views
from django.urls import path

app_name = 'crm_app'

urlpatterns = [
    # Add Product
    path('product/', ProductAPI.as_view()),
    path('product/<int:id>/', ProductAPI.as_view()),
    path('customer/', CustomerAPI.as_view()),
    path('customer/<int:id>/', CustomerAPI.as_view()),
    path('get_customer_details/<int:id>/', CustomerDetailsAPI.as_view()),
    path('get_customer_jobcards/', CustomerJobCardsAPI.as_view()),
    path('jobcard_all/', ManageJobCardAPI.as_view()),
    path('jobcard/', CreateJobCard.as_view()),
    path('get_jobcard_number/', Get_jobcard_number.as_view()),
    path('jobcard/<int:id>/', CreateJobCard.as_view()),
    path('get_jobcard_details/<int:id>/', JobCardDetails.as_view()),
    path('create_number/', CreateNumber.as_view()),
    # path('get_receipts/', GetReceipts.as_view()),



    # SEARCH APIS
    path('search/<slug:type>/', SearchAPI.as_view(),
         name="search"),
]
