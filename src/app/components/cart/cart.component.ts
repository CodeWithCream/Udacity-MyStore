import { Component, OnInit } from '@angular/core';
import { CartItemData } from 'src/app/model/cart-item-data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItemData[] = [];
  total: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCartData().subscribe((cartItems) => {
      this.cartItems = cartItems;
      cartItems.forEach(
        (item) => (this.total += item.quantity * item.product.price)
      );
    });
  }
}
