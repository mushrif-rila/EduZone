# myapp/admin.py

from django.contrib import admin
from myapp.models import Profile, User
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['username','email']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'user']

admin.site.register(User,UserAdmin)
admin.site.register(Profile, ProfileAdmin)
