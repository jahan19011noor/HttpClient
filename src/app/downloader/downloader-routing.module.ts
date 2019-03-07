import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloaderComponent } from './downloader/downloader.component';

const routes: Routes = [
  {
    path: '',
    component: DownloaderComponent,
    children: [
      {
        path: '',
        children: [
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloaderRoutingModule { }
