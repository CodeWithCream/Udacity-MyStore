import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  quantity: number = 1;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {}

  openDetails(): void {
    this.router.navigate(['products/', this.product.id]);
  }

  addToCart(): void {
    this.dataService
      .addToCart({ product: this.product, quantity: this.quantity })
      .subscribe(() => {
        alert(
          `Product: ${this.product.name}, quantity: ${this.quantity} added to cart`
        );
        this.quantity = 1; //restore value
      });
  }
}
