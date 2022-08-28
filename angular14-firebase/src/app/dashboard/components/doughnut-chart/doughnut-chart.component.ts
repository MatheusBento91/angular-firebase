import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  @Input() doughnutChartLabels: string [] = [];
  @Input() doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];
  @Output() chartClick = new EventEmitter();

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

  chartClicked(e: any): void {
    this.chartClick.emit(e);
  }

}
