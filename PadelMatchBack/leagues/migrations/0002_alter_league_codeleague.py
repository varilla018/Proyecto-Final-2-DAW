# Generated by Django 4.1.8 on 2023-05-24 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leagues', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='league',
            name='codeLeague',
            field=models.CharField(editable=False, max_length=100, unique=True),
        ),
    ]
