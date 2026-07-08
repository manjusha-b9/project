import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Productservice } from '../../services/productservice';
import { Productmodel } from '../../module/productmodel';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  private productService = inject(Productservice);
  private router = inject(Router);
  private route=inject(ActivatedRoute);

  products: Productmodel[] = [];
  filteredProducts: Productmodel[] = [];

  searchText = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Productmodel[]) => {
        this.products = data;
        const category = this.route.snapshot.queryParamMap.get('category');
        if (category) {
          this.filteredProducts = this.products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        } else {
          this.filteredProducts = this.products;
        }
       // this.filteredProducts = data;
      },
      error: (err) => console.error(err)
    });
  }

  searchProducts(): void {

    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  }

  Edit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  cart(product: Productmodel): void {
    this.router.navigate(['/order', product.id]);
  }

  addProduct(): void {
    this.router.navigate(['/addproduct']);
  }
}