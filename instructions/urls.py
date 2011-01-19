'''
Created on Dec 20, 2010

@author: chadcumba
'''
from django.conf.urls.defaults import patterns

urlpatterns = patterns('',
    (r'^pregame/$', 'instructions.views.Pregame'),
    (r'^ingameinstructions/$', 'instructions.views.LoadInstructions'),
)