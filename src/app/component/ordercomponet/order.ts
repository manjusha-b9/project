// import { Component,inject, OnInit } from '@angular/core';
// import { Orderservice } from '../../services/orderservice';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Productservice } from '../../services/productservice';
// import { ActivatedRoute } from '@angular/router';
// import { Product } from '../../module/product';

// @Component({
//   selector: 'app-order',
//   imports: [ReactiveFormsModule],
//   templateUrl: './order.html',
//   styleUrl: './order.css',
// })
// export class Order implements OnInit {
//   private orderService=inject(Orderservice);
//   private fb=inject(FormBuilder);
//   private productservice=inject(Productservice);
//   private route=inject(ActivatedRoute)
//   product!:Product;

//   orderForm=this.fb.group({

//     quantity:[1,Validators.required],
//     address:['',Validators.required],
//     city:['',Validators.required],
//     postalCode:['',Validators.required]

//   });
//  ngOnInit(): void {
//       const id=Number(this.route.snapshot.paramMap.get('id'));
//   this.productservice.getProductbyId(id).subscribe({
//     next:(product:Product)=>{
//       this.product=product;
//     },
//     error:()=>{
//       alert("error while fetching product details");
//     }
//   });
//  }
// placeOrder():void{
//   const quantity=this.orderForm.value.quantity || 1;
//   const order={
//     userId:localStorage.getItem("userId"),
//     orderItems:[{
//       name:this.product.name,
//       quantity:quantity,
//       price:this.product.price
//     }],
//     shoppingAddress:{
//       address:this.orderForm.value.address,
//       city:this.orderForm.value.city,
//       postalCode:this.orderForm.value.postalCode
//     },
//     totalPrice:this.product.price * quantity

//   };

//   this.orderService.placeHolder(order).subscribe({
//     next:()=>{
//       alert("order placed successfully you will get order soon ....🤩" );
//       this.orderForm.reset();

//     },
//     error:(err)=>{
//       console.error(err);
//     }
//   })
// }
  
  
// }
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Orderservice } from '../../services/orderservice';
import { Productservice } from '../../services/productservice';
import { Productmodel } from '../../module/productmodel';
import { ordermodel } from '../../module/ordermodel';




@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class OrderComponent implements OnInit {

  private orderService = inject(Orderservice);
  private fb = inject(FormBuilder);
  private productService = inject(Productservice);
  private route = inject(ActivatedRoute);

  product!: Productmodel;

  orderForm = this.fb.nonNullable.group({
    quantity: [1, Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required]
  });

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductbyId(id).subscribe({
      next: (product: Productmodel) => {
        this.product = product;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  placeOrder(): void {

    if (this.orderForm.invalid) {
      return;
    }

    const formValue = this.orderForm.getRawValue();

    const order:ordermodel  = {
      userId: localStorage.getItem('userId') ?? '',

      orderItems: [
        {
          name: this.product.name,
          quantity: formValue.quantity,
          price: this.product.price
        }
      ],

      shoppingAddress: {
        address: formValue.address,
        city: formValue.city,
        postalCode: formValue.postalCode
      },

      totalPrice: this.product.price * formValue.quantity
    };

    this.orderService.placeHolder(order).subscribe({
      next: () => {
        alert('Order placed successfully. You will receive it soon!');
        this.orderForm.reset({
          quantity: 1,
          address: '',
          city: '',
          postalCode: ''
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}