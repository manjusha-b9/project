import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
private router=inject(Router)
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
 const subtotal = this.product.price * formValue.quantity;

  // Free shipping for orders above ₹1000
  const shippingCharge = subtotal >= 1000 ? 0 : 100;

  const totalPrice = subtotal + shippingCharge;

    const order:ordermodel  = {
      userId: localStorage.getItem('userId') ?? '',

      orderItems: [
        {
          name: this.product.name,
          quantity: formValue.quantity,
          price: this.product.price
        }
      ],

      shippingAddress: {
        address: formValue.address,
        city: formValue.city,
        postalCode: formValue.postalCode
      },

       subtotalPrice: subtotal,

    shippingCharge: shippingCharge,

    totalPrice: totalPrice
    };

    this.orderService.placeHolder(order).subscribe({
      next: () => {
        this.productService.updateProductStatus(this.product.id, formValue.quantity).subscribe({
      next: () => {
        alert('Order placed successfully. You will receive it soon!');
        // this.orderForm.reset({
        //   quantity: 1,
        //   address: '',
        //   city: '',
        //   postalCode: ''
        // });
      
      this.router.navigate(['/product']);
      
      
      },
      error:(err)=>{
        console.error(err);
      }
      });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}