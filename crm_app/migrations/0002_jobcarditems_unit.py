# Generated by Django 3.0 on 2021-12-30 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crm_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobcarditems',
            name='unit',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
