import { TestBed } from '@angular/core/testing';

import { DsonewsService } from './dsonews.service';

describe('DsonewsService', () => {
  let service: DsonewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsonewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
