import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ordermodel } from '../module/ordermodel';

@Injectable({
  providedIn: 'root',
})
export class Orderservice {
  private http=inject(HttpClient);
  private Api='http://localhost:3000/orders';
  placeHolder(order:ordermodel):Observable<ordermodel[]>{
    return this.http.post<ordermodel[]>(`${this.Api}/add`,order);
  }
  getOrder():Observable<ordermodel[]>{
    return this.http.get<ordermodel[]>(this.Api);
  }
  cancelOrder(orderId:number):Observable<ordermodel[]>{
  return this.http.put<ordermodel[]>(`${this.Api}/cancel/${orderId}`, { orderId });
}
}
