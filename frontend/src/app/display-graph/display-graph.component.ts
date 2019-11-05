import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CustomerService } from '../services/customer.service';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-display-graph',
  templateUrl: './display-graph.component.html',
  styleUrls: ['./display-graph.component.less', '../global-style.less']
})
export class DisplayGraphComponent implements OnInit {
  graphData;
  public options: any = {
    xAxis: {
      categories: [
      ],
      title: {
        text: 'Names'
      }
    },
    yAxis: {
      title: {
          text: 'Number of Employees'
      }
    },
    series: [{
      name: '',
      data: [],
      type: 'column',
      showInLegend: false
    }]
  };
  constructor(private customerService: CustomerService) {
    this.customerService.getTop4Customers().subscribe((data: any) => {
      this.graphData = data;
      Array.prototype.push.apply(this.graphData.rain, this.graphData.others);
      this.graphData.rain.map((doc: any) => {
        this.options.series[0].data.push({ y: doc['Number of Employees'], color: doc.forecast ? '#69a84f' : '#cb0000'});
        this.options.xAxis.categories.push(doc.Name);
      });
      Highcharts.chart('container', this.options);
    });
   }

  ngOnInit() {
  }

}
