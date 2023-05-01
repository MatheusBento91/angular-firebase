import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  @Output() chartClick = new EventEmitter();

   barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false
   };

   barChartLegend = true;
   barChartPlugins = [];

  constructor() {}

  ngOnInit(): void {}
}
