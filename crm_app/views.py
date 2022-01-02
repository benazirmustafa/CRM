from datetime import datetime
import io
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.contenttypes.models import ContentType
from .models import *
from rest_framework import viewsets, permissions, generics
from .serializers import *
from authentication.models import User
from django.db.models import Q
from rest_framework import permissions
from django.utils import timezone
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, mixins
import django_filters
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.parsers import MultiPartParser


# Pagination for REST FRAMEWORK TAKEN
from rest_framework.pagination import LimitOffsetPagination


class ProductAPI(generics.GenericAPIView,
                 mixins.ListModelMixin,
                 mixins.RetrieveModelMixin,
                 mixins.CreateModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.DestroyModelMixin
                 ):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    lookup_field = "id"
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    # filter_class =
    ordering_fields = [
        'name',
        'unit_price',
    ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request, id)
        else:
            return self.list(request)

    def post(self, request):
        return self.create(request)

    def put(self, request, id=None):
        return self.partial_update(request, id)

    def delete(self, request, id=None):
        return self.destroy(request, id)


class CustomerAPI(generics.GenericAPIView,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin
                  ):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    lookup_field = "id"
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    # filter_class =
    ordering_fields = [
        'name',
        'unit_price',
    ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request, id)
        else:
            return self.list(request)

    def post(self, request):
        return self.create(request)

    def put(self, request, id=None):
        return self.partial_update(request, id)

    def delete(self, request, id=None):
        return self.destroy(request, id)


class ManageJobCardAPI(generics.GenericAPIView,
                       mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.CreateModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.DestroyModelMixin
                       ):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = JobCardSerialzer
    queryset = JobCard.objects.all().order_by("-timestamp")
    lookup_field = "id"
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    # filter_class =
    ordering_fields = [
        'jobcard_number',
        'timestamp',
        'customer'
    ]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request, id)
        else:
            return self.list(request)

    def post(self, request):
        return self.create(request)

    def put(self, request, id=None):
        return self.partial_update(request, id)

    def delete(self, request, id=None):
        return self.destroy(request, id)


class CreateNumber(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def put(self, request, *args, **kwargs):
        job_id = request.GET.get("id")
        type = request.GET.get("type")
        jobcard = JobCard.objects.get(id=job_id)
        if type == "quotation":
            if not jobcard.quotation_number:
                jc = JobCard.objects.latest('quotation_number')
                if jc.quotation_number:
                    number = JobCard.objects.latest('quotation_number')
                    number = int(number.quotation_number.split("-")[1])
                else:
                    number = 0
                number = "PL-"+str(number+1)
                data = {
                    'quotation_number': number
                }
                serializer = JobCardSerialzer(
                    instance=jobcard, data=data, partial=True)
                if serializer.is_valid():
                    jobcard = serializer.save()
                    return Response({"number": number})
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if type == "invoice":
            if not jobcard.invoice_number:
                jc = JobCard.objects.latest('invoice_number')
                if jc.invoice_number:
                    number = JobCard.objects.latest('invoice_number')
                    number = int(number.invoice_number.split("-")[1])
                else:
                    number = 0
                number = "INV-" + str(number+1)
                data = {
                    'invoice_number': number
                }
                serializer = JobCardSerialzer(
                    instance=jobcard, data=data, partial=True)
                if serializer.is_valid():
                    jobcard = serializer.save()
                    return Response({"number": number})
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class GetReceipts(APIView):
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]

#     def get(self, request, *args, **kwargs):
#         job_id = request.GET.get("id")
#         type = request.GET.get("type")

class CustomerJobCardsAPI(generics.GenericAPIView,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.CreateModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin
                          ):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = JobCardSerialzer

    lookup_field = "id"
    filter_backends = (DjangoFilterBackend, OrderingFilter)

    def get_queryset(self):
        id = self.request.GET.get("id")
        customer = Customer.objects.get(id=id)
        jobcards = customer.jobcard_set.all()
        return jobcards

    def get(self, request):
        return self.list(request)


class CustomerDetailsAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, id):
        customer = Customer.objects.get(id=id)
        customer_serializer = CustomerSerializer(customer)
        return Response({"customer": customer_serializer.data})


class Get_jobcard_number(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, *args, **kwargs):
        if JobCard.objects.last():
            jobcard = JobCard.objects.last()
            jobcard = int(jobcard.jobcard_number.split("-")[1])
        else:
            jobcard = 0
        jobcard_number = str(jobcard+1)
        return Response(jobcard_number)


class JobCardDetails(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, id):
        jobCard = JobCard.objects.get(id=id)
        jobCard_serializer = JobCardSerialzer(jobCard)
        jobCardItems = JobCardItems.objects.filter(jobcard=jobCard.id)
        jobCardItems_serializer = JobCardItemsSerialzer(
            jobCardItems, many=True)
        return Response({"jobCardDetails": jobCard_serializer.data, "jobCardItems": jobCardItems_serializer.data})


class CreateJobCard(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        jobcard = request.data.get("jobcard_data")
        serializer = JobCardSerialzer(data=jobcard)
        if serializer.is_valid():
            jobcard = serializer.save()
            jobcard_items = request.data.get("jobcard_items")
            jobcard_items_data = []
            for dataitems in jobcard_items:
                jobcard_items_data.append({
                    "jobcard": int(jobcard.id),
                    "product": dataitems["product"],
                    "details": dataitems["details"],
                    "unit": dataitems["unit"],
                    "unit_price": dataitems["unit_price"],
                    "quantity": dataitems["quantity"],
                    "amount": dataitems["amount"]
                })
            serializerjcitems = JobCardItemsSerialzer(
                data=jobcard_items_data, many=True)
            if serializerjcitems.is_valid():
                serializerjcitems = serializerjcitems.save()
                return Response(serializer.data)
            else:
                return Response(serializerjcitems.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        update_id = request.GET.get("id")
        jobcard = request.data.get("jobcard_data")
        qobject = JobCard.objects.get(id=update_id)
        print(qobject, 'kkkkkkkkkkkkkkkkkkkk')
        serializer = JobCardSerialzer(
            instance=qobject, data=jobcard, partial=True)
        if serializer.is_valid():
            jobcard = serializer.save()
            jobcard_items = request.data.get("jobcard_items")
            JobCardItems.objects.filter(jobcard=jobcard).delete()
            jobcard_items_data = []
            for dataitems in jobcard_items:
                jobcard_items_data.append({
                    "jobcard": int(jobcard.id),
                    "product": dataitems["product"],
                    "details": dataitems["details"],
                    "unit": dataitems["unit"],
                    "unit_price": dataitems["unit_price"],
                    "quantity": dataitems["quantity"],
                    "amount": dataitems["amount"]
                })
            serializerjcitems = JobCardItemsSerialzer(
                data=jobcard_items_data, many=True)
            if serializerjcitems.is_valid():
                serializerjcitems = serializerjcitems.save()
                return Response(serializer.data)
            else:
                return Response(serializerjcitems.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # return Response(serializers.data, status=status.HTTP_200_OK)


class SearchAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, type):
        if type == 'customer':
            user = Customer.objects.filter(Q(name__contains=request.GET.get(
                "search")) | Q(contact__icontains=request.GET.get("search")))
            get_result = CustomerSerializer(
                user, many=True).data
            return Response(get_result)
        if type == "product":
            product = Product.objects.filter(
                Q(name__contains=request.GET.get("search")))
            get_result = ProductSerializer(
                product, many=True).data
            return Response(get_result)
