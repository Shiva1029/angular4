import { TestBed, inject } from '@angular/core/testing';

import { RecruiterJobDetailService } from './recruiter-job-detail.service';

describe('RecruiterJobDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruiterJobDetailService]
    });
  });

  it('should be created', inject([RecruiterJobDetailService], (service: RecruiterJobDetailService) => {
    expect(service).toBeTruthy();
  }));
});
