#!/usr/bin/python
import sys, os

# Add a custom Python path.
sys.path.insert(0, "/home/www/mturk")
sys.path.insert(0, "/home/www")

os.chdir('/home/www/mturk')

# Set the DJANGO_SETTINGS_MODULE environment variable.
os.environ['DJANGO_SETTINGS_MODULE'] = "settings"

from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")
