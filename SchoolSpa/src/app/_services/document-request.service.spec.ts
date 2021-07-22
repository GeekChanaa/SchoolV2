import { TestBed } from '@angular/core/testing';

import { DocumentRequestService } from './document-request.service';

describe('DocumentRequestService', () => {
  let service: DocumentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
