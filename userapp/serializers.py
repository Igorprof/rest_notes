from rest_framework import serializers
from userapp.models import User


class UserModelSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ('id', 'username', 'first_name', 'last_name', 'email')


class UserModelSerializerV2(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ('username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
