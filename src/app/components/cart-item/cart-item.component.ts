import { Component, Input, OnInit, Output } from '@angular/core';
import { CartItemData } from 'src/app/model/cart-item-data';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: CartItemData;
  totalItemPrice: number = 0;
  total: number = 0;
  @Output() itemChanged = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItem.product.price * this.cartItem.quantity;
  }

  quantityChanged() {
    this.calculateTotal();
    this.itemChanged.emit();
  }
}
