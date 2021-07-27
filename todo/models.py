from django.db import models
from userapp.models import User

class Project(models.Model):
    title = models.CharField(max_length=64)
    repository_url = models.CharField(max_length=128, blank=True)
    users = models.ManyToManyField(User)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(blank=True)    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def delete(self):
        self.is_active = False
        self.save()
