# Create your views here.
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.conf import settings


@login_required
def Pregame(request):
    
    js = ['jquery-1.4.2.min.js', 'confirm_checked.js']

    js = ["/" + settings.GAME_MEDIA_URL + "js/" + file for file in js]
    
    styles = ['styles.css']
    styles = ["/" + settings.GAME_MEDIA_URL + "css/" + sheet for sheet in styles]
        
    return render_to_response(
        'instructions/pregame.html',
        {'title':'Instructions',
         'js': js,
         'styles': styles,
         },
        context_instance = RequestContext(request))