import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'config',
    loadChildren: './config/config.module#ConfigModule'
  },
  {
    path: 'downloader',
    loadChildren: './downloader/downloader.module#DownloaderModule'
  },
  {
    path: 'heroes',
    loadChildren: './heroes/heroes.module#HeroesModule'
  },
  {
    path: 'package-search',
    loadChildren: './package-search/package-search.module#PackageSearchModule'
  },
  {
    path: 'uploader',
    loadChildren: './uploader/uploader.module#UploaderModule'
  },
  { path: '', redirectTo: '/config', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
