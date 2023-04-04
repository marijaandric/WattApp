import { TestBed } from '@angular/core/testing';

import { ModelTypesService } from './model-types.service';

describe('ModelTypesService', () => {
  let service: ModelTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
