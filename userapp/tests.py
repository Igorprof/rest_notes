from rest_framework.test import APITestCase
from rest_framework import status
from mixer.backend.django import mixer
from userapp.models import User

class TestUser(APITestCase):
    def test_get_detail(self):
        user = mixer.blend(User)
        response = self.client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user_guest(self):
        user = mixer.blend(User)
        response = self.client.put(f'/api/users/{user.id}/', {'email': 'admin@admin.ru'})

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_user_admin(self):
        user_1 = mixer.blend(User)
        User.objects.create_superuser('admin', 'admin@admin.com', 'admin12345')
        self.client.login(username='admin', password='admin12345')
        response = self.client.put(f'/api/users/{user_1.id}/', {'username': 'name', 'first_name': 'fn', 'last_name': 'ln'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
        user_1 = User.objects.get(id=user_1.id)
        self.assertEqual(response.data.get('username'), 'name')
        self.assertEqual(response.data.get('first_name'), 'fn')
        self.assertEqual(response.data.get('last_name'), 'ln')
        