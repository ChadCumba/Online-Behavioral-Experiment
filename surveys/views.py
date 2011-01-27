# Create your views here
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from surveys.forms import PostgameSurveyForm
from surveys.models import PostgameSurvey
from django.core.urlresolvers import reverse
from django.core.exceptions import PermissionDenied
from django.db import IntegrityError
from django.conf import settings

@csrf_protect
@login_required
def PostgameSurveyView(request):

    if request.method == 'POST':
        form = PostgameSurveyForm(request.POST)
        if form.is_valid():
            try:
                survey = PostgameSurvey.objects.create(
                    what_i_learned = form.cleaned_data['what_i_learned'],
                    play_games = form.cleaned_data['play_games'],
                    past_gaming = form.cleaned_data['past_gaming'],
                    betting_games = form.cleaned_data['betting_games'],
                    user = request.user
                )
            except IntegrityError:
                raise PermissionDenied()
            
            return HttpResponseRedirect(reverse('game.views.GameOver'))
    else:
        survey = PostgameSurvey.objects.filter(user=request.user)
        if(len(survey) > 0):
            return HttpResponseRedirect(reverse('game.views.GameOver'))
        styles = ['survey.css']
        styles = ["/" + settings.GAME_MEDIA_URL + "css/" + sheet for sheet in styles]
        form = PostgameSurveyForm()
    return render_to_response('survey/generic_survey.html', {
        'form' : form,
        'title' : 'Postgame Survey',
        'styles' : styles,
        },
        context_instance=RequestContext(request))