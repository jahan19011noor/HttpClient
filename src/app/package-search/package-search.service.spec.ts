import { TestBed } from '@angular/core/testing';

import { PackageSearchService } from './package-search.service';

describe('PackageSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PackageSearchService = TestBed.get(PackageSearchService);
    expect(service).toBeTruthy();
  });
});
