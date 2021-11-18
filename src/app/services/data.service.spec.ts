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
});
