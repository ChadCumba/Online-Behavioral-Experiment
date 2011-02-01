# Chad Cumba
# Chad.Cumba@mail.utexas.edu
# Developed in the Poldrack Lab at the University of Texas at Austin
from game.models import Game, Outcome
from django.contrib import admin
from django.core.urlresolvers import reverse
from django.http import HttpResponse 

class GameAdmin(admin.ModelAdmin):
    list_display=('__unicode__','game_complete','score','cash_amount',
                  'condition')
    list_filter=('condition',)
    search_fields = ['user__username']
    actions = ['download_results']
    
    def queryset(self, request):
        qs = super(GameAdmin,self).queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user__game__isnull=False)
    
    def download_results(self,request,queryset):
                 
        from django.db import connection
        import csv
        cursor = connection.cursor()
        if (connection.settings_dict['ENGINE'] == 'django.db.backends.sqlite3'):
            sql_string = "select u.username, t.id, t.reaction_time, t.selected_card, t.point_value, t.key_stroke, t.card_location, t.did_user_win, t.trial_number, t.probability,     t.user_id, g.condition, (t.timestamp - g.timestamp) from game_outcome     t left join game_game g on g.user_id = t.user_id  left join auth_user u on     g.user_id = u.id  "
        elif(connection.settings_dict['ENGINE'] == 'django.db.backends.mysql'):
            sql_string = "select u.username, t.id, t.reaction_time, t.selected_card, t.point_value, t.key_stroke, t.card_location, t.did_user_win, t.trial_number, t.probability,     t.user_id, g.condition, TIMEDIFF(t.timestamp ,g.timestamp) from game_outcome     t left join game_game g on g.user_id = t.user_id  left join auth_user u on     g.user_id = u.id  "
        else:
            sql_string = ""
        
        user_games = queryset
        where_clause = " where t.user_id in ("
        for i in range(0,len(user_games)-1):
            where_clause = where_clause + str(user_games[i].user_id) + ","
        where_clause = where_clause + str(user_games[len(user_games)-1].user_id) + ")"
        cursor.execute(sql_string + where_clause, [])
   
            
        rows = cursor.fetchall()
        response = HttpResponse(mimetype="text/csv")
        response['Content-Disposition'] = 'attachment; filename=userresults.csv'
        writer = csv.writer(response)
        for row in rows:
            writer.writerow(row)
        return response
       
    
    
admin.site.register(Game, GameAdmin)
admin.site.register(Outcome)
