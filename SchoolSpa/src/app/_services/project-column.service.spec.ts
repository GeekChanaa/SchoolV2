import { TestBed } from '@angular/core/testing';

import { ProjectColumnService } from './project-column.service';

describe('ProjectColumnService', () => {
  let service: ProjectColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectColumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
