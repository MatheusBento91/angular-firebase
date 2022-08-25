import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartEvent } from 'chart.js';
import { PrincipalStack } from 'src/app/user/models/principal-stack.enum';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {

  loading = true;

  public doughnutChartLabels: string[] = [
    'Full stack',
    'Back-End',
    'Front-End',
    'Mobile',
    'DevOps',
  ];

  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor(private userService: UserService) {}

  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    this.userService.list().subscribe((data) => {
      let fullStack: number = 0;
      let backEnd: number = 0;
      let frontEnd: number = 0;
      let mobile: number = 0;
      let devOps: number = 0;

      data.forEach((item: any) => {
        switch (item.principalStack) {
          case PrincipalStack.FULLTSACK:
            fullStack++;
            break;
          case PrincipalStack.BACKEND:
            backEnd++;
            break;
          case PrincipalStack.FRONTEND:
            frontEnd++;
            break;
          case PrincipalStack.MOBILE:
            mobile++;
            break;
          case PrincipalStack.DEVOPS:
            devOps++;
            break;
        }
      });

      const doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
        [
          {
            label: 'Stack',
            data: [fullStack, backEnd, frontEnd, mobile, devOps],
            backgroundColor: [
              '#DC7633',
              '#16A085',
              '#95A5A6',
              '#2196F3',
              '#AF7AC5',
            ],
            hoverBackgroundColor: [
              '#A04000',
              '#0E6655',
              '#717D7E',
              '#01579B',
              '#76448A',
            ],
            hoverBorderColor: [
              '#A04000',
              '#0E6655',
              '#717D7E',
              '#01579B',
              '#76448A',
            ]
          },
        ];

      this.doughnutChartDatasets = doughnutChartDatasets;
      this.loading = false;
    });
  }
}
