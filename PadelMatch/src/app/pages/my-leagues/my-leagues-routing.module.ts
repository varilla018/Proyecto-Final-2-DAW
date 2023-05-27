import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLeaguesPage } from './my-leagues.page';

const routes: Routes = [
  {
    path: '',
    component: MyLeaguesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLeaguesPageRoutingModule {}
