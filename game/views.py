# Create your views here.
# Create your views here.


from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.http import HttpResponse
from django.utils import simplejson
from mturk.game.models import Game

@login_required
def Instructions(request):
    return render_to_response(
        'generic/base.html',
        {'title':'Instructions'}
    )
@login_required
def Play(request):
    if request.method == 'POST':
        pass
    else:
        pass
    js = ['jquery-1.4.2.min.js', 'action.js', 'autoSelectionTrial.js', 'countdown.js',
        'documentEventHandlers.js', 'experimentDisplayDrivers.js','initialize.js',
        'instruction.js', 'json_parse.js',
        'outcome.js', 'play-game.js','stimulus.js','trial.js','trialsConstruction.js']

    js = ["/" + settings.GAME_MEDIA_URL + "js/" + file for file in js]

    styles = ['styles.css']
    styles = ["/" + settings.GAME_MEDIA_URL + "css/" + sheet for sheet in styles]

    return render_to_response(
        'game/play.html',
        {
            'js':js,
            'styles':styles,
            'media_location': settings.GAME_MEDIA_URL,
        }
    )

@login_required
def LoadGameData(request):

    try:
        game = Game.objects.get(user=request.user)
    except Game.DoesNotExist:
        try:
            game = Game.objects.filter(user=None)[0]
            game.user = request.user
            game.save()
        except IndexError:
            response = {'error': 'Game data not found'}
            json = simplejson.dumps(response)
            return HttpResponse(json, mimetype='application/json')

    json = {
        'game_json' : simplejson.loads(game.game_json),
        'ao_new'    : simplejson.loads(game.ao_new),
        'ao_train'  : simplejson.loads(game.ao_train),
        'so_new'    : simplejson.loads(game.so_new),
    }

    json = simplejson.dumps(json)
    
    return HttpResponse(json, mimetype='application/json')

@login_required
def SaveGameData(request):
    if request.method == "POST":
        trials = simplejson.loads(request.POST['trial_json_data'])
        outcomes = simplejson.loads(request.POST['response_json_data'])


    saved = True
    json = simplejson.dumps(saved)
    return HttpResponse(json, mimetype='application/json')