import { TestBed } from '@angular/core/testing';

import { Orderservice } from './orderservice';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Orderservice', () => {
  let service: Orderservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),provideHttpClientTesting()]
    });
    service = TestBed.inject(Orderservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
