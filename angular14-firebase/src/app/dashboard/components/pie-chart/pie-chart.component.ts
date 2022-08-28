import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() pieChartLabels: String[] = [];
  @Input() pieChartDatasets!: [{ data: [] }];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {}

  ngOnInit(): void {}
}
