import { Component, inject, OnInit } from '@angular/core';
import { Productservice } from '../../services/productservice';
import {  Router } from '@angular/router';
import { Productmodel } from '../../module/productmodel';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
private productservice=inject(Productservice);
private router=inject(Router)
products:Productmodel[]=[];
ngOnInit(): void {
    this.productservice.getProducts().subscribe({
      next:(data:Productmodel[])=>{
        this.products=data;
      },
      error:(err)=>console.error(err)
    });
}
Edit(id:number){
  if(!id)return;
this.router.navigate(['/edit',id])
}
cart(product:Productmodel){
  this.router.navigate(['/order',product.id])
}
addProduct(){
  this.router.navigate(['/addproduct'])
}
}
