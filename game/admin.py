# Chad Cumba
# Chad.Cumba@mail.utexas.edu
# Developed in the Poldrack Lab at the University of Texas at Austin
from game.models import Game, Outcome
from django.contrib import admin

class GameAdmin(admin.ModelAdmin):
    list_display=('__unicode__','game_complete','score')
admin.site.register(Game, GameAdmin)
admin.site.register(Outcome)
