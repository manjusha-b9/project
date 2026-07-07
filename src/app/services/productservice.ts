import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productmodel } from '../module/productmodel';

@Injectable({
  providedIn: 'root',
})
export class Productservice {
  private http=inject(HttpClient);
  private ApiUrl="http://localhost:3000/products";


  getProducts():Observable<Productmodel[]>{
   return this.http.get<Productmodel[]>(this.ApiUrl)
  }
  getProductbyId(id:number):Observable<Productmodel>{
    return this.http.get<Productmodel>(`${this.ApiUrl}/${id}`)
  }
  updateProduct(id:number,product:Productmodel):Observable<Productmodel>{
    return this.http.put<Productmodel>(`${this.ApiUrl}/update/${id}`,product)
  }
  AddProduct(product:Productmodel):Observable<Productmodel>{
    return this.http.post<Productmodel>(`${this.ApiUrl}/add`,product)
  }
}

