from django.test import TestCase
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from mixer.backend.django import mixer
from userapp.models import User
from todo.models import Project, Todo


class TestProjectList(TestCase): # используем TestCase и APIClient
    def test_get_list(self):
        client = APIClient()
        response = client.get('/api/projects/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewSet(APITestCase):
    def test_get_detail(self):
        project = Project.objects.create(title='11', repository_url='/url')
        response = self.client.get(f'/api/projects/{project.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user(self):
        project = Project.objects.create(title='11', repository_url='/url')
        response = self.client.put(f'/api/projects/{project.id}/', {'title':'22', 'repository_url': '/'})

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_get_detail_users(self):
        user_1 = mixer.blend(User)
        user_2 = mixer.blend(User)
        project = mixer.blend(Project, users=[user_1, user_2])

        User.objects.create_superuser('admin', 'admin@admin.com', 'admin12345')
        self.client.login(username='admin', password='admin12345')
        response = self.client.get(f'/api/projects/{project.id}/')
    
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTodoViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        todo = mixer.blend(Todo)
        response = self.client.get(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user(self):
        todo = mixer.blend(Todo)
        response = self.client.put(f'/api/todos/{todo.id}/', {'text': 'my_text'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_todo(self):
        user = mixer.blend(User)
        user_1 = mixer.blend(User)
        project = mixer.blend(Project, users=[user])        
        todo = mixer.blend(Todo, project=project, user=user_1)

        response = self.client.get(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
