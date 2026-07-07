import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  OrderComponent} from './order';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('Order', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderComponent],
      providers:[provideHttpClient(),provideHttpClientTesting(),
          {
          provide:ActivatedRoute,
          useValue:{
            snapshot:{
              paramMap:convertToParamMap ({
                id:'1'
              }),
              queryParamMap:convertToParamMap({})
            }
          } 
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
