from django.urls import path
from knox import views as knox_views
from django.conf.urls import include
from .views import (LoginAPI, PasswordAPI, UserAPI,
                    ManageUserListAPI, ManageUserAPI, 
                    SearchAPI,  ChangePasswordAPI)

app_name = 'auth'
urlpatterns = [
    # Auth API
    path('api/auth', include('knox.urls')),
    path('api/auth/login', LoginAPI.as_view(), name="login"),
    path('api/auth/password/', PasswordAPI.as_view()),
    path('api/auth/change-password/', ChangePasswordAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),

    # Manage User
    path('api/auth/manage-user/', ManageUserAPI.as_view()),
    path('api/auth/manage-user/<int:id>', ManageUserAPI.as_view()),
    path('api/auth/manage-user-list/', ManageUserListAPI.as_view()),
    path('api/auth/search/<slug:type>', SearchAPI.as_view()),

    # Password Reset APIs
    path('api/password-reset/',
         include('django_rest_passwordreset.urls', namespace='password-reset'), name="password-reset"),
]
