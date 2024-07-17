#urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, RegisterView, protectedView, view_all_routes, ProfileDetailView, CourseDetailView, CourseListCreateView, SubheadingDetailView, SubheadingListCreateView, EnrollmentListCreateView, VideoDetailView, VideoListCreateView, DocumentDetailView, DocumentListCreateView, ProfileListView, NotificationListCreateView, NotificationDetail

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', ProfileDetailView.as_view(), name='profile-detail'),
    # path('history/', HistoryListCreateView.as_view(), name='history-list-create'),
    path('api/test/', protectedView, name="test"),

    path('api/courses/', CourseListCreateView.as_view(), name='course_list_create'),
    path('api/courses/<int:pk>/', CourseDetailView.as_view(), name='course_detail'),
    path('api/subheadings/', SubheadingListCreateView.as_view(), name='subheading_list_create'),
    path('api/subheadings/<int:pk>/', SubheadingDetailView.as_view(), name='subheading_detail'),
    path('api/enrollments/', EnrollmentListCreateView.as_view(), name='enrollment_list_create'),
    path('api/videos/<int:subheading_pk>/', VideoListCreateView.as_view(), name='video_list_create'),
    path('api/videos/<int:pk>/', VideoDetailView.as_view(), name='video_detail'),
    path('api/documents/<int:subheading_pk>/', DocumentListCreateView.as_view(), name='document_list_create'),
    path('api/documents/<int:pk>/', DocumentDetailView.as_view(), name='document_detail'),
    path('api/profiles/', ProfileListView.as_view(), name='profile_list'),
    path('api/notifications/', NotificationListCreateView.as_view(), name='notification_list_create'),
    path('notifications/<int:pk>/', NotificationDetail.as_view(), name='notification-detail'),
]
