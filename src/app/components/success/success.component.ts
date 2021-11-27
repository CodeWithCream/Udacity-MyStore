import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faGlassCheers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  faGlassCheers = faGlassCheers;
  customerName: string = '';
  total: number = 0;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.customerName = history.state.customer;
    this.total = history.state.total;
  }

  goBack() {
    this.router.navigate(['products']);
  }
}
