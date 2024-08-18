#serializers.py


from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Profile, Course, Enrollment, Profile_img
from .models import Notification, Course, CourseFile, CourseImage, CourseVideo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MyTOPS(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['role'] = user.profile.role
        token['institute'] = user.profile.institute

        return token
    

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(write_only=True, required=True)
    role = serializers.CharField(write_only=True, required=False)
    institute = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'username', 'password', 'password2', 'role', 'institute']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password':"Password Fields Didn't Match"}
            )
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])

        user.save()

        if "full_name" in validated_data:
            user.profile.full_name = validated_data['full_name']
            user.profile.save()

        if "role" in validated_data:
            user.profile.role = validated_data['role']
            user.profile.save()

        if "institute" in validated_data:
            user.profile.institute = validated_data['institute']
            user.profile.save()

        if "username" in validated_data:
            user.profile.profile_username = validated_data['username']
            user.profile.save()

        if "email" in validated_data:
            user.profile.profile_email = validated_data['email']
            user.profile.save()

        return user


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile_img
        fields = '__all__'
    
class ProfileSerializer(serializers.ModelSerializer):
    profile_img = ProfileImageSerializer(required=False)
    class Meta:
        model = Profile
        fields = ['id', 'user', 'full_name', 'bio', 'verified', 'role', 'institute', 'profile_username', 'profile_email', 'profile_img']

    # def update(self, instance, validated_data):
    #     # Check if the profile image is being removed
    #     if 'profile_img' in self.initial_data and self.initial_data['profile_img'] == '':
    #         instance.profile_img.delete(save=False)
    #         validated_data['profile_img'] = None
    #     return super().update(instance, validated_data)
    
    
# class VideoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Video
#         fields = ['id', 'title', 'file', 'subheading']

# class DocumentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Document
#         fields = ['id', 'title', 'file', 'subheading']

# class SubheadingSerializer(serializers.ModelSerializer):
#     videos = VideoSerializer(many=True, read_only=True)
#     documents = DocumentSerializer(many=True, read_only=True)

#     class Meta:
#         model = Subheading
#         fields = ['id', 'title', 'videos', 'documents']

# class CourseSerializer(serializers.ModelSerializer):
#     subheadings = SubheadingSerializer(many=True, required=False)

#     class Meta:
#         model = Course
#         fields = ['id', 'title', 'description', 'teacher', 'subheadings']
#         read_only_fields = ['teacher']

#     def create(self, validated_data):
#         subheadings_data = validated_data.pop('subheadings', [])
#         course = Course.objects.create(**validated_data)
#         for subheading_data in subheadings_data:
#             Subheading.objects.create(course=course, **subheading_data)
#         return course

class CourseFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseFile
        fields = ['id', 'file']

class CourseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseImage
        fields = ['id', 'image']

class CourseVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseVideo
        fields = ['id', 'video']

class CourseSerializer(serializers.ModelSerializer):
    files = CourseFileSerializer(many=True, read_only=True)
    images = CourseImageSerializer(many=True, read_only=True)
    videos = CourseVideoSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'created_at', 'files', 'images', 'videos']


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'student']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'created_at']