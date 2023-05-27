import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'ligas',
    loadChildren: () => import('./pages/ligas/ligas.module').then( m => m.LigasPageModule)
  },
  {
    path: 'torneos',
    loadChildren: () => import('./pages/torneos/torneos.module').then( m => m.TorneosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'mercado',
    loadChildren: () => import('./pages/mercado/mercado.module').then( m => m.MercadoPageModule)
  },
  {
    path: 'creacionliga',
    loadChildren: () => import('./pages/creacionliga/creacionliga.module').then( m => m.CreacionligaPageModule)
  },
  {
    path: 'my-leagues/:id',
    loadChildren: () => import('./pages/my-leagues/my-leagues.module').then( m => m.MyLeaguesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
