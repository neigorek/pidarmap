import { TestBed } from '@angular/core/testing';

import { DtoMapperService } from './dto-mapper.service';

describe('DtoMapperService', () => {
  let service: DtoMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtoMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
