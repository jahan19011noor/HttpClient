import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PackageSearchService } from '../package-search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NpmPackageInfo } from '../npm-package-info';

@Component({
  selector: 'app-package-search',
  templateUrl: './package-search.component.html',
  providers: [ PackageSearchService ],
  styles: []
})
export class PackageSearchComponent implements OnInit {

  withRefresh = false;
  packages$: Observable<NpmPackageInfo[]>
  /**
   * The searchText$ is the sequence of search-box values
   * It's defined as an RxJS Subject, which means
   *    it is a multicasting Observable
   *        that can also product values for itself
   *            by calling next(value)
   * as happens in the search() method
   */
  private searchText$ = new Subject<string>();

  constructor(private packageSearchService: PackageSearchService) { }

  ngOnInit() {
    this.packages$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      /**
       * The switchMap() operator has three important characteristics.
       * 1. It takes a function argument that returns an Observable.
       *    - PackageSearchService.search returns an Observable
       * 2. If a previous search request is still in-flight,
       *    - it cancels that request and sends a new one
       * 3. It returns service responses in their original request order,
       *    - even if the server returns them out of order
       */
      switchMap(pacakgeName => 
        this.packageSearchService.search(pacakgeName, this.withRefresh))
    )
  }

  search(packageName: string) {
    this.searchText$.next(packageName);
  }

  toggleRefresh() {
    this.withRefresh = ! this.withRefresh
  }
}
