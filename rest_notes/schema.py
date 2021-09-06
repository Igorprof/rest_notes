import graphene
from graphene_django import DjangoObjectType
from userapp.models import User
from todo.models import Project, Todo

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info):
        return User.objects.all()

    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    all_todos = graphene.List(TodoType)

    def resolve_all_todos(self, info):
        return Todo.objects.all()

    users_by_project = graphene.List(UserType, project_name=graphene.String(required=False))

    def resolve_users_by_project(self, info, project_name=None):
        users = User.objects.all()
        if project_name:
            users = User.objects.filter(project__title=project_name)
        return users

schema = graphene.Schema(query=Query)
