from django.db import models

# Create your models here.

class Instruction(models.Model):
    text = models.TextField(null=False)
    condition = models.IntegerField(null=False)
    wieght = models.IntegerField(null=True)
    name = models.CharField(null=False, max_length=255)
    
    def __unicode__(self):
        if self.name is not None:
            return self.name
        return 'none'