import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreacionligaPageRoutingModule } from './creacionliga-routing.module';

import { CreacionligaPage } from './creacionliga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreacionligaPageRoutingModule
  ],
  declarations: [CreacionligaPage]
})
export class CreacionligaPageModule {}
