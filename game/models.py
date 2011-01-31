from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Game(models.Model):
    class Meta:
        ordering = ('user',)
    game_json = models.TextField(blank=False)
    ao_new = models.TextField(blank=False)
    ao_train = models.TextField(blank=False)
    so_new = models.TextField(blank=False)
    condition = models.IntegerField(blank=True)
    timestamp = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User,unique=True,blank=True,null=True)

    def length(self):
        return 240

    def __unicode__(self):
        if(self.user != None):
            return self.user.username +"'s game"
        return 'Unassigned Game'

    def score(self):
        """Return the score if one exists, else a string saying n/a"""
        if self.user is not None and self.game_complete():
            outcomes = Outcome.objects.filter(user=self.user)
            points = [outcome.point_value for outcome in outcomes]
            return sum(points)
        return 'n/a'

    def game_complete(self):
        if self.user is not None:
            outcomes = Outcome.objects.filter(user=self.user)
            return len(outcomes) == self.length()
        return False
    
    def cash_amount(self):
        if self.game_complete():
            amount = float(self.score()) / 700
            amount = round(amount, 2)
            if(amount < 0):
                amount = 0
            amount = amount + 1
            if(amount > 5):
                amount = 5
            return amount
        return 0

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
    timestamp = models.DateTimeField(auto_now=True)
    probability = models.CharField(max_length=255)
    user = models.ForeignKey(User, unique=False)