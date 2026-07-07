import { Component, inject, OnInit } from '@angular/core';
import { Productservice } from '../../services/productservice';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Productmodel } from '../../module/productmodel';


@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editproduct.html',
  styleUrls: ['./editproduct.css'],
})
export class Editproduct implements OnInit {
  
  private productService = inject(Productservice);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  product!: Productmodel // initialize as object for ngModel bindings

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;
    const id = Number(idParam);
    this.productService.getProductbyId(id).subscribe(data => {
      this.product = data || {};
      console.log('loaded product', this.product);
    });
  }

  UpdateProduct() {
    if (!this.product?.id) {
      alert('Product id missing');
      return;
    }
    this.productService.updateProduct(this.product.id, this.product).subscribe(() => {
      alert('product updated successfully..');
      this.router.navigate(['/product']);
    });
  }
}
