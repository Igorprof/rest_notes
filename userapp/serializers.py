from rest_framework import serializers
from userapp.models import User


class UserModelSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ('username', 'first_name', 'last_name', 'email')
