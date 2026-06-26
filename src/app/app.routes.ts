import { Routes } from '@angular/router';
import { Product } from './component/product/product';
import { Editproduct } from './component/editproduct/editproduct';
import { Cart } from './component/cart/cart';
import { Home } from './component/home/home';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'product',component:Product},
    { path:'edit/:id',component:Editproduct},
    {path:'cart',component:Cart},
   

];
