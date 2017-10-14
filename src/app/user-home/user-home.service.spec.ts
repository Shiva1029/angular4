import { TestBed, inject } from '@angular/core/testing';

import { UserHomeService } from './user-home.service';

describe('UserHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserHomeService]
    });
  });

  it('should be created', inject([UserHomeService], (service: UserHomeService) => {
    expect(service).toBeTruthy();
  }));
});
