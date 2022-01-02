from rest_framework import serializers
# from uspl.models import *
from django.contrib.auth.models import Group, Permission
from .models import *
from django.contrib.auth import authenticate
from rest_framework.fields import Field
from django.db.models import Q
from django.contrib.auth.hashers import make_password

# User Serializer


class PermissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Permission
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    permission_details = serializers.SerializerMethodField(
        'get_permission_details')

    def get_permission_details(self, instance):
        permissions = instance.permissions
        serializer = PermissionSerializer(permissions, many=True)
        return serializer.data

    class Meta:
        model = Group
        fields = '__all__'

    def validate(self, data):
        name = data['name']
        if name == "Admin":
            message = str('Can Not Create Admin as Group Name')
            raise serializers.ValidationError(
                {'Invalid Group Name': message})
        else:
            return data


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=False,
    )
    user_groups = GroupSerializer(source='groups', many=True, read_only=True)

    class Meta:
        model = User
        fields = "__all__"

    # def create(self, validated_data):
    #     # Chnage: in Production
    #     # password = User.objects.make_random_password()
    #     validated_data['password'] = make_password('123456sb')
    #     user = super().create(validated_data)
    #     return user


class UserShortSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="get_full_name")

    class Meta:
        model = User
        fields = ['id', 'full_name', 'first_name',
                  'photo', 'email', 'username', ]


class UserExcelListingField(Field):
    def to_representation(self, value):
        # first_name = value.first_name
        return "{0} {1}".format(value.first_name, value.last_name)

    def to_internal_value(self, data):
        try:
            try:
                return User.objects.get(Q(first_name__iexact=data.lower()) | Q(last_name__iexact=data.lower()) | Q(username__iexact=data.lower()))
            except User.MultipleObjectsReturned:
                raise serializers.ValidationError(
                    'Multiple Users Found for Given Data: ' + str(data)
                )
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User does not exists: ' + str(data)
            )


class PasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(min_length=8)
    new_password = serializers.CharField(min_length=8)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
