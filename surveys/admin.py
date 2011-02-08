# Chad Cumba
# Chad.Cumba@mail.utexas.edu
# Developed in the Poldrack Lab at the University of Texas at Austin
from surveys.models import PostgameSurvey
from django.contrib import admin
from django.core.exceptions import ObjectDoesNotExist
import csv
from django.http import HttpResponse
from django.forms.models import model_to_dict

class SurveyAdmin(admin.ModelAdmin):
    
    actions = ['download_survey_results']
    
    def download_survey_results(self, request,queryset):
        try:
            [survey.user.get_profile() for survey in queryset]
        except ObjectDoesNotExist:
            self.message_user(request, 'One or more of the users does not have a profile.')
            self.message_user(request, 'Error, download canceled')
            return
        
        survey_keys = queryset[0]._meta.get_all_field_names()
        profile_keys = queryset[0].user.get_profile()._meta.get_all_field_names()
        
        response = HttpResponse(mimetype="text/csv")
        response['Content-Disposition'] = 'attachment; filename=profilesurvey.csv'
        
        writer = csv.writer(response)
        writer.writerow(profile_keys + survey_keys)
        
        for survey in queryset:
            
            survey_dict = model_to_dict(survey)
            profile_dict = model_to_dict(survey.user.get_profile())
            row = []
            for key in profile_keys:
                if type(profile_dict[key]) is unicode:
                    row.append(profile_dict[key].encode('ascii','ignore'))
                else:
                    row.append(profile_dict[key])
            for key in survey_keys:
                if type(survey_dict[key]) is unicode:
                    row.append( survey_dict[key].encode('ascii','ignore'))
                else:
                    row.append(survey_dict[key])
            
            writer.writerow(row)
        return response
        
    download_survey_results.short_description = "Download Survey/Profile Data"

admin.site.register(PostgameSurvey,SurveyAdmin)

