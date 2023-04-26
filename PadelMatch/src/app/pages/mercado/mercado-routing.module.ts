import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MercadoPage } from './mercado.page';

const routes: Routes = [
  {
    path: '',
    component: MercadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MercadoPageRoutingModule {}
