# Generated by Django 4.1.8 on 2023-06-01 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('players', '0002_player_tournament_points'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='image',
            field=models.URLField(blank=True, null=True),
        ),
    ]
