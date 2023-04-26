import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreacionligaPage } from './creacionliga.page';

const routes: Routes = [
  {
    path: '',
    component: CreacionligaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreacionligaPageRoutingModule {}
