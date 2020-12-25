import { TestBed } from '@angular/core/testing';

import { LoggedAuthGuardService } from './logged-auth-guard.service';

describe('LoggedAuthGuardService', () => {
  let service: LoggedAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
