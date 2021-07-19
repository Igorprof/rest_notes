from django.core.management import BaseCommand

from userapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        for i in range(1, 6):
            User.objects.create(username=f'user_{i}', first_name=f'user_{i}_name', last_name=f'user_{i}_last_name', email=f'user_{i}@users.com')