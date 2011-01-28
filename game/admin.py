# Chad Cumba
# Chad.Cumba@mail.utexas.edu
# Developed in the Poldrack Lab at the University of Texas at Austin
from game.models import Game, Outcome
from django.contrib import admin

class GameAdmin(admin.ModelAdmin):
    list_display=('__unicode__','game_complete','score','cash_amount',
                  'condition')
    list_filter=('condition',)
    search_fields = ['user__username']
    
    def queryset(self, request):
        qs = super(GameAdmin,self).queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user__game__isnull=False)
    
admin.site.register(Game, GameAdmin)
admin.site.register(Outcome)
