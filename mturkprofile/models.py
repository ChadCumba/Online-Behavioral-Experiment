from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


# Create your models here.

class MturkProfile(models.Model):
    user = models.ForeignKey(User,unique=True)
    mturk_id = models.CharField(max_length=255, blank=False)
    age = models.IntegerField()
    gender = models.CharField(max_length=1,blank=False)
    handedness = models.CharField(max_length=1,blank=False)

    def clean(self):
        from django.core.exceptions import ValidationError

        if self.age < 13 or self.age > 99:
            raise ValidationError('All participants must be at least 13 years of age')

        if self.gender is not 'M' and self.gender is not 'F':
            raise ValidationError('Gender is invalid')

        if self.handedness is not 'R' and self.handedness is not 'L':
            raise ValidationError('Must be either right or left handed')