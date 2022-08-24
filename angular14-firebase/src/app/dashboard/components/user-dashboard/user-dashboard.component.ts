import { Component, OnInit } from '@angular/core';
import {
  ChartOptions,
  ChartType,
  ChartDataset,
  ChartConfiguration,
} from 'chart.js';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: String[] = [
    'Apple',
    'Banana',
    'Kiwifruit',
    'Blueberry',
    'Orange',
    'Grapes',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' },
  ];

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      { data: [350, 450, 100], label: 'Series A' },
      // { data: [50, 150, 120], label: 'Series B' },
      // { data: [250, 130, 70], label: 'Series C' },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  ngOnInit(): void {}
}
