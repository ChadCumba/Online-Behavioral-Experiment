# Chad Cumba
# Chad.Cumba@mail.utexas.edu
# Developed in the Poldrack Lab at the University of Texas at Austin

from django.conf.urls.defaults import patterns

urlpatterns = patterns('',
    (r'^instructions/$', 'mturk.game.views.Instructions'),
    (r'^play/$','mturk.game.views.Play'),
    (r'^loaddata/$', 'mturk.game.views.LoadGameData'),
    (r'^savedata/$', 'mturk.game.views.SaveGameData'),
)