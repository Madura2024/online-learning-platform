from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    IS_STUDENT = 'student'
    IS_INSTRUCTOR = 'instructor'
    ROLE_CHOICES = [
        (IS_STUDENT, 'Student'),
        (IS_INSTRUCTOR, 'Instructor'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=IS_STUDENT)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
