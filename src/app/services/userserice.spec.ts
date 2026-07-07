import { TestBed } from '@angular/core/testing';

import { Userserice } from './userserice';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Userserice', () => {
  let service: Userserice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),provideHttpClientTesting()]
    });
    service = TestBed.inject(Userserice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
