from crm_app.models import Customer
from .models import *
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from .serializers import *
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.core.exceptions import PermissionDenied
from django.utils import timezone
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.contrib.contenttypes.models import ContentType

from django.contrib.auth.models import Group
# Pagination for REST FRAMEWORK TAKEN
from rest_framework.pagination import LimitOffsetPagination

# NEW
from rest_framework import generics, mixins
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ManageUserListAPI(generics.GenericAPIView,
                        mixins.ListModelMixin):

    permission_classes = [
        permissions.IsAuthenticated
    ]
    pagination_class = None
    serializer_class = UserShortSerializer
    queryset = User.objects.all()

    lookup_field = "id"

    def get(self, request, id=None):
        return self.list(request)


class ManageUserAPI(generics.GenericAPIView,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin):

    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'username__first_name': ['exact', 'icontains', 'in'],
        'username': ['exact', 'in'],
        'groups': ['exact'],
        'is_superuser': ['exact']
    }
    lookup_field = "id"

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


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1],
            })
        else:
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class PasswordAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    model = User

    def post(self, request):
        user = request.user
        if not user.check_password(request.data.get('password')):
            return Response({'message': "Incorrect Password"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': "Success"}, status=status.HTTP_200_OK)


class ChangePasswordAPI(generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = PasswordSerializer
    model = User

    def update(self, request):
        user = request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'message': "Incorrect Old Password"}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'message': "Password Updated Successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SearchAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, type):
        if type == 'user':
            user = User.objects.filter(Q(username__contains=request.data.get('search')) | Q(first_name__icontains=request.data.get(
                'search')) | Q(last_name__icontains=request.data.get('search')))
            get_result = UserShortSerializer(
                user, many=True).data
            return Response(get_result)
