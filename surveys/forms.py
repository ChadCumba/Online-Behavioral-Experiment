# Chad Cumba
# Chad.Cumba@mail.utexas.edu
# Developed in the Poldrack Lab at the University of Texas at Austin

from django import forms

class PostgameSurveyForm(forms.Form):
    what_i_learned = forms.CharField(
        widget=forms.widgets.Textarea,
        label="For the betting game, what did you learn? \
        Was there a rule you used for making your choice? \
        Did you have a strategy? What was it? Were you able to learn? \
        How hard was it?"
    )
    TIME_CHOICES = (
        ('never','Never'),
        ('1/month', 'About once a month'),
        ('1/week', 'About once a week'),
        ('semi-daily', 'Almost every day'),
        ('daily', 'Every day'),
    )
    play_games = forms.ChoiceField(
        widget=forms.widgets.RadioSelect,
        choices=TIME_CHOICES,
        label="Do you currently play video or computer games?"
    )
    past_gaming = forms.ChoiceField(
        widget=forms.widgets.RadioSelect,
        choices=TIME_CHOICES,
        label="If you gamed more in your past, did you at that point play \
        video or computer games:"
    )
    betting_games = forms.CharField(
        max_length=1000,
        widget=forms.widgets.Textarea,
        label="Do you play betting games (ie poker, blackjack) or games \
        with puzzles? If so, which and how often?",
        required=False
    )

    