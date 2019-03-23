import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageSearchRoutingModule } from './package-search-routing.module';
import { PackageSearchComponent } from './package-search/package-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PackageSearchComponent],
  imports: [
    CommonModule,
    PackageSearchRoutingModule,
    FormsModule
  ]
})
export class PackageSearchModule { }
