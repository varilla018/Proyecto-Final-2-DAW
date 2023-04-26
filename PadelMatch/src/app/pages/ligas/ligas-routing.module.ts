import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LigasPage } from './ligas.page';

const routes: Routes = [
  {
    path: '',
    component: LigasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LigasPageRoutingModule {}
