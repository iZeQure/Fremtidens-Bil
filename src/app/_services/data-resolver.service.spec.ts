/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataResolverService } from './data-resolver.service';

describe('Service: DataResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataResolverService]
    });
  });

  it('should ...', inject([DataResolverService], (service: DataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
