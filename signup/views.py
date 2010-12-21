# Create your views here.

from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_protect
from django.template import RequestContext
from mturk.signup.forms import MturkSignupForm
from mturk.mturkprofile.models import MturkProfile
from django.contrib import messages
from django.contrib.auth.views import login as auth_login
from django.contrib.auth import login as login_method
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from mturk import settings

import logging 
LOG_FILENAME = '/tmp/django.log'
logging.basicConfig(filename=LOG_FILENAME,level=logging.DEBUG)



@csrf_protect
def register(request):
    """ Provide a registration form if not authenticated, 
    redirect if authenticated,
    create user and log user in if submitting the form.
    """
    if request.user.is_authenticated():
        messages.add_message(request, messages.INFO, 'You are already signed up')
        return HttpResponseRedirect("/instructions/pregame")

    if request.method == 'POST':
        user_count = User.objects.all().count()
        #deep copy post so that we can provide a username
        altered_post = request.POST.copy()
        altered_post['username'] = "subject" + str(user_count).zfill(4)
        #build the form with our deep copied post data
        form = MturkSignupForm(altered_post)
        if form.is_valid():
            new_user = form.save()
            profile, created = MturkProfile.objects.get_or_create(
                user=new_user,
                mturk_id =form.cleaned_data['mturk_id'],
                age = form.cleaned_data['age'],
                handedness = form.cleaned_data['handedness'],
                gender = form.cleaned_data['gender']
            )
            user = authenticate(username = new_user.username,
                                password=altered_post['password1'])
            if user is not None:
                if user.is_active:
                    login_method(request,user)
                    messages.add_message(request, messages.INFO,
                        'You\'ve been assigned the following username: ' + 
                        new_user.username + '. If you get logged out, you can log back in '
                        +'with your username and password at this page.')
                    messages.add_message(request, messages.INFO, 'Successfully created and logged in user: '
                        + new_user.username)
                    return HttpResponseRedirect("/instructions/pregame/")
    else:
        form = MturkSignupForm()

    return render_to_response("signup/register.html", {
        'form' : form
    }, context_instance=RequestContext(request))
    

def login(request):
    """Provide a login form if not authenticated, display a message and 
    redirect if authenticated"""
    if request.user.is_authenticated():
        messages.add_message(request, messages.INFO, 'You are already logged in')
        return HttpResponseRedirect("/instructions/pregame")
    return auth_login(request)