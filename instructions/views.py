# Create your views here.
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required


@login_required
def Pregame(request):
    return render_to_response(
        'generic/base.html',
        {'title':'Instructions'},
        context_instance = RequestContext(request))