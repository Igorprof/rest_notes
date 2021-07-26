from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from userapp.models import User
from userapp.serializers import UserModelSerializer


class UserModelViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
   queryset = User.objects.all()
   serializer_class = UserModelSerializer
