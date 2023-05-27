import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyLeaguesPageRoutingModule } from './my-leagues-routing.module';

import { MyLeaguesPage } from './my-leagues.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLeaguesPageRoutingModule
  ],
  declarations: [MyLeaguesPage]
})
export class MyLeaguesPageModule {}
