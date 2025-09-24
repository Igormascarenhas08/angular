import { TestBed } from '@angular/core/testing';

import { AlinpService } from './aluno.service';

describe('AlinpService', () => {
  let service: AlinpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlinpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
