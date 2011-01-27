from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class PostgameSurvey(models.Model):
    what_i_learned = models.TextField(null=False)
    play_games = models.CharField(max_length=255,null=False)
    past_gaming = models.CharField(max_length=255,null=False)
    betting_games = models.TextField()
    user = models.ForeignKey(User,unique=True)

    def __unicode__(self):
        return '{0} Postgame'.format(self.user.username)