import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private dataService: DataService, private router: Router) {
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

  itemRemoved(productId: number) {
    this.dataService.removeFromCart(productId).subscribe(() => {
      this.ngOnInit();
    });
  }

  onSubmit() {
    this.router.navigate(['success'], {
      state: {
        customer: this.customer.fullName,
        total: this.total,
      },
    });
  }
}
