import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orderstatus } from './orderstatus';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Orderstatus', () => {
  let component: Orderstatus;
  let fixture: ComponentFixture<Orderstatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orderstatus],
      providers:[provideHttpClient(),provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orderstatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
