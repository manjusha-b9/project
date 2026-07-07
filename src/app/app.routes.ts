import { Routes } from '@angular/router';
import { Product } from './component/product/product';
import { Editproduct } from './component/editproduct/editproduct';
import { Home } from './component/home/home';
import { Addproduct } from './component/addproduct/addproduct';
import { Login } from './component/login/login';
import {  OrderComponent } from './component/ordercomponet/order';
import { Navbar } from './component/navbar/navbar';

export const routes: Routes = [
    {path:'',component:Navbar},
    {path:'home',component:Home},
    {path:'product',component:Product},
    { path:'edit/:id',component:Editproduct},
    {path:'order/:id',component:OrderComponent},
    {path:'addproduct',component:Addproduct},
    {path:'login',component:Login},
    
   

];
