import { TestBed } from '@angular/core/testing';

import { AbsenceJustificationService } from './absence-justification.service';

describe('AbsenceJustificationService', () => {
  let service: AbsenceJustificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceJustificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
