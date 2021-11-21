import { Injectable } from '@angular/core';
import { forkJoin, map, observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { CartItem } from '../model/cart-item';
import { CartItemData } from '../model/cart-item-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = '../../assets/data.json';

  cart: Map<number, number> = new Map<number, number>(); //productId, quantity

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.dataUrl).pipe(
      map((items: Product[]) => {
        return items.find((item: Product) => item.id === id);
      })
    );
  }

  addToCart(cartItem: CartItem): Observable<void> {
    return new Observable<void>((subscriber) => {
      let quantity = cartItem.quantity;
      if (this.cart.has(cartItem.productId)) {
        quantity += this.cart.get(cartItem.productId) || 0;
      }

      this.cart.set(cartItem.productId, quantity);

      subscriber.next();
    });
  }

  getCartData(): Observable<CartItemData[]> {
    return new Observable<CartItemData[]>((subscriber) => {
      let requests = Array.from(this.cart.keys()).map((id) => {
        return this.getProduct(id);
      });

      forkJoin(requests).subscribe((responses) => {
        const cartItems = new Array<CartItemData>();
        responses.forEach((response) => {
          if (response !== undefined) {
            let product = response as Product;
            let quantity = this.cart.get(product.id) || 0;
            cartItems.push({
              product: product,
              quantity: quantity
            });
          }
        });
        subscriber.next(cartItems);
      });
    });
  }
}
