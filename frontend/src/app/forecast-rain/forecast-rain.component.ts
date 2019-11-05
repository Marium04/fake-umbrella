import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CustomerService } from '../services/customer.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-forecast-rain',
  templateUrl: './forecast-rain.component.html',
  styleUrls: ['./forecast-rain.component.less' , '../global-style.less'],
  animations: [
    trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ])]
})
export class ForecastRainComponent implements OnInit {
  dataSource: any = [];
  resultsLength = 0;
  displayedColumns: string[] = ['Name',
    'Person of Contact',
    'Telephone Number'
    ];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable(): void {
    const self = this;
    self.customerService.getRainForecast().subscribe( (data: any) => {
      console.log(data);
      self.dataSource = new MatTableDataSource(data);
      self.resultsLength = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }
}
