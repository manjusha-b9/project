import { Component, inject, OnInit } from '@angular/core';
import { Productservice } from '../../services/productservice';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './addproduct.html',
  styleUrl: './addproduct.css',
})
export class Addproduct implements OnInit{
productForm!:FormGroup;
private productService=inject(Productservice);
private fb=inject(FormBuilder);
private router=inject(Router);

ngOnInit(): void {
  this.productForm=this.fb.group({
    name:["",[Validators.required,Validators.min(3)]],
    description:["",[Validators.required,Validators.minLength(10)]],
    price:["",[Validators.required,Validators.min(1)]],
    image:["",[Validators.required]],
    category:["",[Validators.required]],
    stock:['',[Validators.required,Validators.min(0)]]
  })  
}
addProduct(){
  if(this.productForm.valid){
    this.productService.AddProduct(this.productForm.value).subscribe({
      next:()=>{
        console.log("product added successfully....");
        alert("product added successfully");
        this.productForm.reset();
        this.router.navigate(['/product'])
      },
      error:(err)=>{
        console.log(err);
        alert("Failed to add product");
      }


    });
  }else{
    this.productForm.markAllAsTouched();
  }
}
}
