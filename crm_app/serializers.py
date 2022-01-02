from rest_framework import serializers
from authentication.models import User
from .models import *

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"
        
class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = "__all__"

class JobCardSerialzer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.name", read_only=True)
    customer_address = serializers.CharField(source="customer.address", read_only=True)
    class Meta:
        model = JobCard
        fields = "__all__"


class JobCardItemsSerialzer(serializers.ModelSerializer):
    class Meta:
        model = JobCardItems
        fields = "__all__"