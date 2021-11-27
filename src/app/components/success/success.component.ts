import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  faGlassCheers = faGlassCheers;
  customerName: string = '';
  total: number = 0;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.customerName = history.state.customer;
    this.total = history.state.total;
  }

  goBack() {
    this.dataService.emptyCart().subscribe();
    this.router.navigate(['products']);
  }
}
