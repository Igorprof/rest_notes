from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from userapp.models import User
from userapp.serializers import UserModelSerializer, UserModelSerializerV2


class UserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
   queryset = User.objects.all()

   def get_serializer_class(self):
      if self.request.version == 'v2':
         return UserModelSerializerV2
      return UserModelSerializer
