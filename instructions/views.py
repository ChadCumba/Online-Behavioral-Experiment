# Create your views here.
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.conf import settings
from instructions.models import Instruction
from game.models import Game
from django.http import HttpResponse
from django.utils import simplejson

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
    
@login_required
def LoadInstructions(request):
    try:
        game = Game.objects.get(user=request.user)
    except Game.DoesNotExist:
        try:
            game = Game.objects.filter(user=None)[0]
        except IndexError:
            response = {'error': 'Game data not found'}
            json = simplejson.dumps(response)
            return HttpResponse(json, mimetype='application/json')

    
    instructions = Instruction.objects.order_by('wieght').filter(
                    condition=game.condition)
    web_instructions = []
    for instruction in instructions:
        web_instructions.append(instruction.text)
    return HttpResponse(simplejson.dumps(web_instructions),
                        mimetype='application/json')
    
    