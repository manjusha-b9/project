import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Productservice {
  private http=inject(HttpClient);
  private ApiUrl="http://localhost:3000/products";


  getProducts():Observable<any>{
   return this.http.get<any[]>(this.ApiUrl)
  }
  getProductbyId(id:number):Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}/${id}`)
  }
  updateProduct(id:number,product:any):Observable<any>{
    return this.http.put<any>(`${this.ApiUrl}/update/${id}`,product)

  }
}

