from django.db import models

# Create your models here.

class Instruction(models.Model):
    text = models.TextField(null=False)
    condition = models.IntegerField(null=False)
    wieght = models.IntegerField(null=True)
    