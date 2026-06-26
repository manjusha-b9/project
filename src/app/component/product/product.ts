import { Component, inject, OnInit } from '@angular/core';
import { Productservice } from '../../services/productservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
private productservice=inject(Productservice);
private router=inject(Router)
products:any[]=[];
ngOnInit(): void {
    this.productservice.getProducts().subscribe({
      next:(data)=>{
        this.products=data;
      },
      error:(err)=>console.error(err)
    });
}
Edit(id:number){
  if(!id)return;
this.router.navigate(['/edit',id])
}
cart(){
  this.router.navigate(['/cart'])
}
}
