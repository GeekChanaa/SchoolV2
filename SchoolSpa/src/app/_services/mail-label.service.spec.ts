import { TestBed } from '@angular/core/testing';

import { MailLabelService } from './mail-label.service';

describe('MailLabelService', () => {
  let service: MailLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
