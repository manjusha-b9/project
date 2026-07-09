import { Component, inject, OnInit } from '@angular/core';
import { Orderservice } from '../../services/orderservice';
import { ordermodel } from '../../module/ordermodel';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderstatus',
  imports: [CommonModule],
  templateUrl: './orderstatus.html',
  styleUrl: './orderstatus.css',
})
export class Orderstatus implements OnInit {
private orderservice=inject(Orderservice);
orders:ordermodel[]=[];
  ngOnInit(): void {
      this.loadOrders();

  }
  loadOrders(){
    this.orderservice.getOrder().subscribe({
      next:(data:ordermodel[])=>{
        this.orders=data;
      },
      error:(err)=>console.error(err)
    });

  }
  cancelOrder(orderId:number){
    this.orderservice.cancelOrder(orderId).subscribe({
      next:(data:ordermodel[])=>{
        console.log('Order cancelled successfully');
          console.log(data);
        this.loadOrders();
      },
      error:(err)=>console.error(err)
    });
  }

}
