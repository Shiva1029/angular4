import { TestBed, inject } from '@angular/core/testing';

import { RecruiterHomeService } from './recruiter-home.service';

describe('RecruiterHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruiterHomeService]
    });
  });

  it('should be created', inject([RecruiterHomeService], (service: RecruiterHomeService) => {
    expect(service).toBeTruthy();
  }));
});
