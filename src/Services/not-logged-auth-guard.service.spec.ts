import { TestBed } from '@angular/core/testing';

import { NotLoggedAuthGuardService } from './not-logged-auth-guard.service';

describe('NotLoggedAuthGuardService', () => {
  let service: NotLoggedAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotLoggedAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
