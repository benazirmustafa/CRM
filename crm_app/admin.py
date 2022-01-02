from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Product)
admin.site.register(Stock)
admin.site.register(Customer)
admin.site.register(JobCard)
admin.site.register(JobCardItems)
admin.site.register(Invoice)
admin.site.register(Quatation)