import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CartItem } from '../model/cart-item';
import { CartItemData } from '../model/cart-item-data';
import { Product } from '../model/product';

import { DataService } from './data.service';

describe('DataService', () => {
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    dataService = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should return data from the file', (done: DoneFn) => {
    dataService.getProducts().subscribe((data: Product[]) => {
      expect(data.length).toEqual(6);
      expect(data[0].name).toEqual('Book');
      expect(data[1].name).toEqual('Headphones');
      expect(data[2].name).toEqual('Backpack');
      expect(data[3].name).toEqual('Glasses');
      expect(data[4].name).toEqual('Cup');
      expect(data[5].name).toEqual('Shirt');
      done();
    });
  });

  it('should return data by id', (done: DoneFn) => {
    const expectedProductData: Product = {
      id: 2,
      name: 'Headphones',
      price: 249.99,
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Listen to stuff!',
    };

    dataService.getProduct(2).subscribe((data: Product | undefined) => {
      expect(data).toBeDefined();
      expect(data).toEqual(expectedProductData);
      done();
    });
  });

  it('should return undefined if product not exist', (done: DoneFn) => {
    dataService.getProduct(10).subscribe((data: Product | undefined) => {
      expect(data).toBeUndefined();
      done();
    });
  });

  it('should add new product to cart', (done: DoneFn) => {
    let product: Product = {
      id: 2,
      name: 'Headphones',
      price: 249.99,
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Listen to stuff!',
    };

    let cartItem = { productId: product.id, quantity: 3 };

    let expectedCartItemData = {
      product: product,
      quantity: cartItem.quantity
    };

    dataService.addToCart(cartItem).subscribe(() => done());

    dataService.getCartData().subscribe((items) => {
      expect(items.length).toEqual(1);
      expect(items[0]).toEqual(expectedCartItemData);
      done();
    });
  });

  it('should add quantity to existing product in cart', (done: DoneFn) => {
    let product: Product = {
      id: 2,
      name: 'Headphones',
      price: 249.99,
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Listen to stuff!',
    };
    let cartItem1 = { productId: product.id, quantity: 3 };

    dataService.addToCart(cartItem1).subscribe(() => done());

    let cartItem2 = { productId: product.id, quantity: 3 };

    dataService.addToCart(cartItem2).subscribe(() => done());

    dataService.getCartData().subscribe((items) => {
      expect(items.length).toEqual(1);
      expect(items[0].quantity).toEqual(
        cartItem1.quantity + cartItem2.quantity
      );
      done();
    });
  });

  it('sholud return cart data', (done: DoneFn) => {
    let cartItemsToAdd: CartItem[] = [
      { productId: 2, quantity: 1 },
      { productId: 1, quantity: 3 },
    ];

    cartItemsToAdd.forEach((cartItem) =>
      dataService.addToCart(cartItem).subscribe(() => done())
    );

    const expectedCartItems: CartItemData[] = [
      {
        product: {
          id: 2,
          name: 'Headphones',
          price: 249.99,
          url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          description: 'Listen to stuff!',
        },
        quantity: 1
      },
      {
        product: {
          id: 1,
          name: 'Book',
          price: 9.99,
          url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          description: 'You can read it!',
        },
        quantity: 3,
      },
    ];

    dataService.getCartData().subscribe((items) => {
      expect(items).toEqual(expectedCartItems);
      done();
    });
  });
});
