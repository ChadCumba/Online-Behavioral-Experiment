from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Game(models.Model):
    game_json = models.TextField(blank=False)
    ao_new = models.TextField(blank=False)
    ao_train = models.TextField(blank=False)
    so_new = models.TextField(blank=False)
    user = models.ForeignKey(User,unique=True,blank=True,null=True)

    def __unicode__(self):
        if(self.user != None):
            return self.user.username +"'s game"
        return 'Unassigned Game'


class Trial(models.Model):
    game = models.ForeignKey(Game,blank=False)
    far_left_feature = models.IntegerField(blank=False)
    mid_left_feature = models.IntegerField(blank=False)
    mid_right_feature = models.IntegerField(blank=False)
    far_right_feature = models.IntegerField(blank=False)

class Outcome(models.Model):
    reaction_time = models.IntegerField()
    selected_card = models.IntegerField()
    point_value = models.IntegerField()
    key_stroke = models.CharField(max_length=1)
    card_location = models.IntegerField()
    did_user_win = models.BooleanField()
    trial_number = models.IntegerField()
    user = models.ForeignKey(User, unique=False)