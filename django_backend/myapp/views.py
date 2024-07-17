#views.py

from rest_framework.response import Response
from rest_framework import status
from .models import User
from django.conf import settings
from rest_framework.parsers import MultiPartParser, JSONParser

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import logging

from .models import Profile
# from .serializers import ProfileSerializer
from rest_framework import generics
from .models import Profile, Profile_img
from .serializers import ProfileSerializer, ProfileImageSerializer
from .permissions import IsStudent, IsTeacher
from rest_framework import status, viewsets

logger = logging.getLogger(__name__)


from django.shortcuts import render
from .models import User
# Create your views here.

from .serializers import MyTOPS, RegistrationSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .models import Notification
from .serializers import NotificationSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOPS

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protectedView(request):
    output = f"Welcome {request.user}, Authentication Successful"
    return Response({'response':output}, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_routes(request):
    data = [
        'api/token/refresh/',
        'api/register/',
        'api/token/'
    ]

    return Response(data)


class ProfileDetailView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def perform_create(self, serializer):
        image_data = self.request.data.get('profile_img', None)
        if image_data:
            image_serializer = ProfileImageSerializer(data={'profile_img': image_data})
            if image_serializer.is_valid():
                image_instance = image_serializer.save()
                serializer.save(user=self.request.user, image=image_instance)
            else:
                return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        image_instance = instance.profile_img
        self.perform_destroy(instance)
        if image_instance:
            image_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class ProfileImageViewSet(viewsets.ModelViewSet):
    queryset = Profile_img.objects.all()
    serializer_class = ProfileImageSerializer
    permission_classes = [IsAuthenticated]


class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

###################################################################################


from rest_framework import generics, permissions
from .models import Course, Subheading, Enrollment, Video, Document
from .serializers import CourseSerializer, SubheadingSerializer, EnrollmentSerializer, VideoSerializer, DocumentSerializer

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user.profile)

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

class SubheadingListCreateView(generics.ListCreateAPIView):
    queryset = Subheading.objects.all()
    serializer_class = SubheadingSerializer
    permission_classes = [permissions.IsAuthenticated]

class SubheadingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subheading.objects.all()
    serializer_class = SubheadingSerializer
    permission_classes = [permissions.IsAuthenticated]

class EnrollmentListCreateView(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user.profile)

class VideoListCreateView(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, JSONParser)

    def perform_create(self, serializer):
        subheading = Subheading.objects.get(pk=self.kwargs['subheading_pk'])
        serializer.save(subheading=subheading)

class VideoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]

class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, JSONParser)

    def perform_create(self, serializer):
        subheading = Subheading.objects.get(pk=self.kwargs['subheading_pk'])
        serializer.save(subheading=subheading)

class DocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]



class NotificationListCreateView(generics.ListCreateAPIView):
    queryset = Notification.objects.all().order_by('-created_at')
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]


class NotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer