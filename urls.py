from django.conf.urls.defaults import *
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^mturk/', include('mturk.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),

    (r'^signup/', include('mturk.signup.urls')),
    (r'^accounts/login/$', 'django.contrib.auth.views.login',
        {'template_name': 'signup/login.html'}),
    (r'^accounts/$', 'django.contrib.auth.views.login',
        {'template_name': 'signup/login.html'}),
    (r'^accounts/logout/$', 'django.contrib.auth.views.logout',
        {'template_name':'signup/logout.html'}),
    (r'^surveys/', include('mturk.surveys.urls')),
    (r'^game/', include('mturk.game.urls')),
    (r'^'+ settings.GAME_MEDIA_URL +'(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': '/Users/chadcumba/Documents/Aptana Studio 3 Workspace/mturk/static'}),
)