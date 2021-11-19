import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = '../../assets/data.json';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.dataUrl).pipe(
      map((items: Product[]) => {
        return items.find((item: Product) => {
          return item.id === id;
        });
      })
    );
  }
}
