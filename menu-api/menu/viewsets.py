from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from menu.models import Menu

from menu.seralizers import MenuSerializer

class MenuViewSet(viewsets.ModeViewSet):
    queryset = Menu.object.all()
    serializer_class = MenuSerializer
    permissions_classes = [AllowAny]
