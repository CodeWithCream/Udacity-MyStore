import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { DataService } from 'src/app/services/data.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  private id!: number;
  product: Product | undefined;

  faArrowLeft = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);

      this.dataService.getProduct(this.id).subscribe((product) => {
        this.product = product;
      });
    });
  }
}
