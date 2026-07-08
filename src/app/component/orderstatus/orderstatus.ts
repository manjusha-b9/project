import { Component, inject, OnInit } from '@angular/core';
import { Orderservice } from '../../services/orderservice';
import { ordermodel } from '../../module/ordermodel';

@Component({
  selector: 'app-orderstatus',
  imports: [],
  templateUrl: './orderstatus.html',
  styleUrl: './orderstatus.css',
})
export class Orderstatus implements OnInit {
private orderservice=inject(Orderservice);
orders:ordermodel[]=[];
  ngOnInit(): void {
      this.orderservice.getOrder().subscribe({
      next:(data:ordermodel[])=>{
        this.orders=data;
      },
      error:(err)=>console.error(err) 
      })
  }

}
