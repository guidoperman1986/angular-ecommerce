import { TestBed } from '@angular/core/testing';

import { Toaster } from './toaster';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Toaster', () => {
  let service: Toaster;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(),]
    });
    service = TestBed.inject(Toaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
