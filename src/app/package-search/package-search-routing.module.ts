import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageSearchComponent } from './package-search/package-search.component';

const routes: Routes = [
  {
    path: '',
    component: PackageSearchComponent,
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
export class PackageSearchRoutingModule { }
