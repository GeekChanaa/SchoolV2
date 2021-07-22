import { TestBed } from '@angular/core/testing';

import { HomeworkCommentService } from './homework-comment.service';

describe('HomeworkCommentService', () => {
  let service: HomeworkCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeworkCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
