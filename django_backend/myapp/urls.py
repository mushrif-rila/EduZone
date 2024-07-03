from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, RegisterView, protectedView, view_all_routes, ProfileDetailView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', ProfileDetailView.as_view(), name='profile-detail'),
    # path('history/', HistoryListCreateView.as_view(), name='history-list-create'),
    path('api/test/', protectedView, name="test"),
]
