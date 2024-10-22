# Chad Cumba
# Chad.Cumba@mail.utexas.edu
# Developed in the Poldrack Lab at the University of Texas at Austin

from django.contrib.auth.forms import UserCreationForm
from django import forms

class MturkSignupForm(UserCreationForm):
    
        
    mturk_id = forms.CharField()
    
    GENDER_CHOICES = (
        ('F', 'Female'),
        ('M', 'Male'),
    )
    gender = forms.ChoiceField(choices=GENDER_CHOICES)

    HANDEDNESS_CHOICES = (
        ('R', 'Right'),
        ('L', 'Left'),
    )
    handedness = forms.ChoiceField(choices=HANDEDNESS_CHOICES)
    age = forms.IntegerField(min_value=18,max_value=40, error_messages={
            'max_value' : 'Your age must be between 18 and 40 to participate',
            'min_value' : 'Your age must be between 18 and 40 to participate',
                                                                        })
    username = forms.CharField(widget=forms.HiddenInput())
    