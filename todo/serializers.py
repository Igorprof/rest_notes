from rest_framework import serializers
from todo.models import Project, Todo
from userapp.serializers import UserModelSerializer


class ProjectModelSerializer(serializers.ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(serializers.ModelSerializer):
    project = ProjectModelSerializer()
    user = UserModelSerializer()

    class Meta:
       model = Todo
       fields = '__all__'

