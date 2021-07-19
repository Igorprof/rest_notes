from django.core.management import BaseCommand

from userapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        for i in range(1, 6):
            user = User.objects.get(username=f'user_{i}')
            user.delete()