# Chad Cumba
# Chad.Cumba@mail.utexas.edu
# Developed in the Poldrack Lab at the University of Texas at Austin

from django.conf.urls.defaults import patterns

urlpatterns = patterns('',
    (r'^instructions/$', 'game.views.Instructions'),
    (r'^play/$','game.views.Play'),
    (r'^loaddata/$', 'game.views.LoadGameData'),
    (r'^savedata/$', 'game.views.SaveGameData'),
)