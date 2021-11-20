import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { CartItem } from '../model/cart-item';

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

  addToCart(cartItem: CartItem): void {
    let quantity = cartItem.quantity;
    if (this.cart.has(cartItem.product.id)) {
      quantity += this.cart.get(cartItem.product.id) || 0;
    }

    this.cart.set(cartItem.product.id, quantity);
  }

  getCartData(): Observable<CartItem[]> {
    const observable = new Observable<CartItem[]>((subscriber) => {
      let requests = Array.from(this.cart.keys()).map((id) => {
        return this.getProduct(id);
      });

      forkJoin(requests).subscribe((responses) => {
        const cartItems = new Array<CartItem>();
        responses.forEach((response) => {
          if (response !== undefined) {
            let product = response as Product;
            cartItems.push({
              product: product,
              quantity: this.cart.get(product.id) || 0,
            });
          }
        });
        subscriber.next(cartItems);
      });
    });
    return observable;
  }
}
