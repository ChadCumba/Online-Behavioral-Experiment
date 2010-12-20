# Create your views here.

from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_protect
from django.template import RequestContext
from mturk.signup.forms import MturkSignupForm
from mturk.mturkprofile.models import MturkProfile

import logging 
LOG_FILENAME = '/tmp/django.log'
logging.basicConfig(filename=LOG_FILENAME,level=logging.DEBUG)



@csrf_protect
def register(request):
    
    if request.user.is_authenticated():
        return HttpResponseRedirect("/instructions/pregame")

    if request.method == 'POST':
        form = MturkSignupForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            profile, created = MturkProfile.objects.get_or_create(
                user=new_user,
                mturk_id =form.cleaned_data['mturk_id'],
                age = form.cleaned_data['age'],
                handedness = form.cleaned_data['handedness'],
                gender = form.cleaned_data['gender']
            )
            return HttpResponseRedirect("/instructions/pregame/")
    else:
        form = MturkSignupForm()

    return render_to_response("signup/register.html", {
        'form' : form
    }, context_instance=RequestContext(request))