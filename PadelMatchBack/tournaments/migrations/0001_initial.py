# Generated by Django 4.1.8 on 2023-05-30 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('players', '0002_player_tournament_points'),
        ('leagues', '0002_alter_league_codeleague'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('leagues', models.ManyToManyField(related_name='tournaments', to='leagues.league')),
                ('players', models.ManyToManyField(related_name='tournaments', to='players.player')),
            ],
        ),
    ]
