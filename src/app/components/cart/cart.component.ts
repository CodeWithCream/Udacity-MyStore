import { Component, OnInit } from '@angular/core';
import { CartItemData } from 'src/app/model/cart-item-data';
import { customer } from 'src/app/model/customer';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItemData[] = [];
  total: number = 0;
  customer: customer;

  constructor(private dataService: DataService) {
    this.customer = {
      fullName: '',
      address: '',
      creditCardNumber: '',
    };
  }

  ngOnInit(): void {
    this.dataService.getCartData().subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.calculateTotal(cartItems);
    });
  }

  calculateTotal(cartItems: CartItemData[]) {
    this.total = 0;
    cartItems.forEach(
      (item) => (this.total += item.quantity * item.product.price)
    );
  }

  itemChanged() {
    this.calculateTotal(this.cartItems);
  }

  onSubmit() {}
}
