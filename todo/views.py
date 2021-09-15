from rest_framework.generics import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from todo.models import Project, Todo
from todo.serializers import ProjectModelSerializer, TodoModelSerializer, ProjectModelSerializerV2, TodoModelSerializerV2
from rest_framework.pagination import LimitOffsetPagination


class ProjectLimitOffsetPagination(LimitOffsetPagination): # по 10 проектов
   default_limit = 10

class TodoLimitOffsetPagination(LimitOffsetPagination): # по 20 заметок
   default_limit = 20


class ProjectModelViewSet(ModelViewSet):
   pagination_class = ProjectLimitOffsetPagination

   def get_queryset(self):
      name_for_search = self.request.query_params.get('project_name', None)
      if name_for_search:
         return Project.objects.filter(title__icontains=name_for_search)
      return Project.objects.all()

   def get_serializer_class(self):
      if self.request.version == 'v2':
         return ProjectModelSerializerV2
      return ProjectModelSerializer


class TodoModelViewSet(ModelViewSet):
   pagination_class = TodoLimitOffsetPagination

   def get_queryset(self):
      project_for_search = self.request.query_params.get('project_name', None)
      if project_for_search:
         return Todo.objects.filter(project__title=project_for_search)
      return Todo.objects.all()

   def get_serializer_class(self):
      if self.request.version == 'v2':
         return TodoModelSerializerV2
      return TodoModelSerializer

   def delete(self, request, pk=None):
      todo = get_object_or_404(Todo, pk=pk)

      todo.delete()