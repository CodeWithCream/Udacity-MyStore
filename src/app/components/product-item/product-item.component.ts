import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openDetails(): void {
    this.router.navigate(['products/', this.product.id]);
  }
}
