# Chad Cumba
# Chad.Cumba@mail.utexas.edu
# Developed in the Poldrack Lab at the University of Texas at Austin
from game.models import Game, Outcome
from django.contrib import admin
from django.core.urlresolvers import reverse

class GameAdmin(admin.ModelAdmin):
    list_display=('__unicode__','game_complete','score','cash_amount',
                  'condition', 'DownloadDataLink')
    list_filter=('condition',)
    search_fields = ['user__username']
    
    def queryset(self, request):
        qs = super(GameAdmin,self).queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user__game__isnull=False)
    
    def DownloadDataLink(self, game):
        return  reverse('game.views.GetOutcomesByUser',
                args=[game.user_id]) 
    
admin.site.register(Game, GameAdmin)
admin.site.register(Outcome)
