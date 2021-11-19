import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
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
    const expectedProductData = {
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
});
