# Create your views here
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from surveys.forms import PregameSurveyForm
from surveys.models import PregameSurvey
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.db import IntegrityError

@csrf_protect
@login_required
def PregameSurveyView(request):

    if request.method == 'POST':
        form = PregameSurveyForm(request.POST)
        if form.is_valid():
            try:
                survey = PregameSurvey.objects.create(
                    what_i_learned = form.cleaned_data['what_i_learned'],
                    play_games = form.cleaned_data['play_games'],
                    past_gaming = form.cleaned_data['past_gaming'],
                    betting_games = form.cleaned_data['betting_games'],
                    user = request.user
                )
            except IntegrityError:
                raise PermissionDenied()
            
            return HttpResponseRedirect('survey/complete')
    else:
        form = PregameSurveyForm()
    return render_to_response('survey/generic_survey.html', {
        'form' : form,
        'title' : 'Pregame Survey',
        },
        context_instance=RequestContext(request))