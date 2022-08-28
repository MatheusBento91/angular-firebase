import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DevelopersLevel } from 'src/app/user/enum/developers-level.enum';
import { PrincipalStack } from 'src/app/user/enum/principal-stack.enum';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  loading = true;

  //doughnut
  public doughnutChartLabels: string[] = [
    PrincipalStack.FULLTSACK,
    PrincipalStack.BACKEND,
    PrincipalStack.FRONTEND,
    PrincipalStack.MOBILE,
    PrincipalStack.DEVOPS,
  ];

  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];

  //pie
  public pieChartLabels = [
    DevelopersLevel.JUNIOR,
    DevelopersLevel.MIDLEVEL,
    DevelopersLevel.SENIOR,
    DevelopersLevel.SPECIALIST,
    DevelopersLevel.TECHLEAD,
  ];
  public pieChartDatasets: any = [
    {
      data: [],
    },
  ];

  //bar
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [],
  };

  //bar salary range
  public barChartSalaryRangeData: ChartConfiguration<'bar'>['data'] = {
    datasets: [],
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsersPrincipalStack();
    this.getUsersLevel();
    this.getUsersSalary();
  }

  doughnutChartClicked(e: any) {}

  getUsersPrincipalStack() {
    this.userService.get().subscribe((data) => {
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
            ],
          },
        ];

      this.doughnutChartDatasets = doughnutChartDatasets;
      this.loading = false;
    });
  }

  getUsersLevel() {
    this.userService.get().subscribe((data) => {
      let junior: number = 0;
      let midLevel: number = 0;
      let senior: number = 0;
      let specialist: number = 0;
      let techLead: number = 0;

      data.forEach((item: any) => {
        switch (item.level) {
          case DevelopersLevel.JUNIOR:
            junior++;
            break;
          case DevelopersLevel.MIDLEVEL:
            midLevel++;
            break;
          case DevelopersLevel.SENIOR:
            senior++;
            break;
          case DevelopersLevel.SPECIALIST:
            specialist++;
            break;
          case DevelopersLevel.TECHLEAD:
            techLead++;
            break;
        }
      });

      this.pieChartDatasets = [
        {
          data: [junior, midLevel, senior, specialist, techLead],
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
          ],
        },
      ];

      this.loading = false;
    });
  }

  getUsersSalary() {
    this.userService.get().subscribe((data) => {
      if (data) {
        let fullStack: any[] = [];
        let fullStackCounter: any[] = [];
        let backEnd: any[] = [];
        let backEndCounter: any[] = [];
        let frontEnd: any[] = [];
        let frontEndCounter: any[] = [];
        let mobile: any[] = [];
        let mobileCounter: any[] = [];
        let devOps: any[] = [];
        let devOpsCounter: any[] = [];

        data.forEach((item: any, index) => {
          switch (item.principalStack) {
            case PrincipalStack.FULLTSACK:
              if (item.salaryExpectation < 5000) {
                if (fullStack[0] != undefined)
                  fullStack[0] = fullStack[0] + item.salaryExpectation;
                else fullStack[0] = item.salaryExpectation;

                if (fullStackCounter[0] != undefined)
                  fullStackCounter[0] = fullStackCounter[0] + 1;
                else fullStackCounter[0] = 1;
              } else if (
                item.salaryExpectation > 5000 &&
                item.salaryExpectation < 10000
              ) {
                if (fullStack[1] != undefined)
                  fullStack[1] = fullStack[1] + item.salaryExpectation;
                else fullStack[1] = item.salaryExpectation;

                if (fullStackCounter[1] != undefined)
                  fullStackCounter[1] = fullStackCounter[1] + 1;
                else fullStackCounter[1] = 1;
              } else if (
                item.salaryExpectation > 10000 &&
                item.salaryExpectation < 15000
              ) {
                if (fullStack[2] != undefined)
                  fullStack[2] = fullStack[2] + item.salaryExpectation;
                else fullStack[2] = item.salaryExpectation;

                if (fullStackCounter[2] != undefined)
                  fullStackCounter[2] = fullStackCounter[2] + 1;
                else fullStackCounter[2] = 1;
              } else if (
                item.salaryExpectation > 15000 &&
                item.salaryExpectation < 20000
              ) {
                if (fullStack[3] != undefined)
                  fullStack[3] = fullStack[3] + item.salaryExpectation;
                else fullStack[3] = item.salaryExpectation;

                if (fullStackCounter[3] != undefined)
                  fullStackCounter[3] = fullStackCounter[3] + 1;
                else fullStackCounter[3] = 1;
              } else if (item.salaryExpectation > 2000) {
                if (fullStack[4] != undefined)
                  fullStack[4] = fullStack[4] + item.salaryExpectation;
                else fullStack[4] = item.salaryExpectation;

                if (fullStackCounter[4] != undefined)
                  fullStackCounter[4] = fullStackCounter[4] + 1;
                else fullStackCounter[4] = 1;
              }

              break;
            case PrincipalStack.BACKEND:
              if (item.salaryExpectation < 5000) {
                if (backEnd[0] != undefined)
                  backEnd[0] = backEnd[0] + item.salaryExpectation;
                else backEnd[0] = item.salaryExpectation;

                if (backEndCounter[0] != undefined)
                  backEndCounter[0] = backEndCounter[0] + 1;
                else backEndCounter[0] = 1;
              } else if (
                item.salaryExpectation > 5000 &&
                item.salaryExpectation < 10000
              ) {
                if (backEnd[1] != undefined)
                  backEnd[1] = backEnd[1] + item.salaryExpectation;
                else backEnd[1] = item.salaryExpectation;

                if (backEndCounter[1] != undefined)
                  backEndCounter[1] = backEndCounter[1] + 1;
                else backEndCounter[1] = 1;
              } else if (
                item.salaryExpectation > 10000 &&
                item.salaryExpectation < 15000
              ) {
                if (backEnd[2] != undefined)
                  backEnd[2] = backEnd[2] + item.salaryExpectation;
                else backEnd[2] = item.salaryExpectation;

                if (backEndCounter[2] != undefined)
                  backEndCounter[2] = backEndCounter[2] + 1;
                else backEndCounter[2] = 1;
              } else if (
                item.salaryExpectation > 15000 &&
                item.salaryExpectation < 20000
              ) {
                if (backEnd[3] != undefined)
                  backEnd[3] = backEnd[3] + item.salaryExpectation;
                else backEnd[3] = item.salaryExpectation;

                if (backEndCounter[3] != undefined)
                  backEndCounter[3] = backEndCounter[3] + 1;
                else backEndCounter[3] = 1;
              } else if (item.salaryExpectation > 2000) {
                if (backEnd[4] != undefined)
                  backEnd[4] = backEnd[4] + item.salaryExpectation;
                else backEnd[4] = item.salaryExpectation;

                if (backEndCounter[4] != undefined)
                  backEndCounter[4] = backEndCounter[4] + 1;
                else backEndCounter[4] = 1;
              }

              break;
            case PrincipalStack.FRONTEND:
              if (item.salaryExpectation < 5000) {
                if (frontEnd[0] != undefined)
                  frontEnd[0] = frontEnd[0] + item.salaryExpectation;
                else frontEnd[0] = item.salaryExpectation;

                if (frontEndCounter[0] != undefined)
                  frontEndCounter[0] = frontEndCounter[0] + 1;
                else frontEndCounter[0] = 1;
              } else if (
                item.salaryExpectation > 5000 &&
                item.salaryExpectation < 10000
              ) {
                if (frontEnd[1] != undefined)
                  frontEnd[1] = frontEnd[1] + item.salaryExpectation;
                else frontEnd[1] = item.salaryExpectation;

                if (frontEndCounter[1] != undefined)
                  frontEndCounter[1] = frontEndCounter[1] + 1;
                else frontEndCounter[1] = 1;
              } else if (
                item.salaryExpectation > 10000 &&
                item.salaryExpectation < 15000
              ) {
                if (frontEnd[2] != undefined)
                  frontEnd[2] = frontEnd[2] + item.salaryExpectation;
                else frontEnd[2] = item.salaryExpectation;

                if (frontEndCounter[2] != undefined)
                  frontEndCounter[2] = frontEndCounter[2] + 1;
                else frontEndCounter[2] = 1;
              } else if (
                item.salaryExpectation > 15000 &&
                item.salaryExpectation < 20000
              ) {
                if (frontEnd[3] != undefined)
                  frontEnd[3] = frontEnd[3] + item.salaryExpectation;
                else frontEnd[3] = item.salaryExpectation;

                if (frontEndCounter[3] != undefined)
                  frontEndCounter[3] = frontEndCounter[3] + 1;
                else frontEndCounter[3] = 1;
              } else if (item.salaryExpectation > 2000) {
                if (frontEnd[4] != undefined)
                  frontEnd[4] = frontEnd[4] + item.salaryExpectation;
                else frontEnd[4] = item.salaryExpectation;

                if (frontEndCounter[4] != undefined)
                  frontEndCounter[4] = frontEndCounter[4] + 1;
                else frontEndCounter[4] = 1;
              }

              break;
            case PrincipalStack.MOBILE:
              if (item.salaryExpectation < 5000) {
                if (mobile[0] != undefined)
                  mobile[0] = mobile[0] + item.salaryExpectation;
                else mobile[0] = item.salaryExpectation;

                if (mobileCounter[0] != undefined)
                  mobileCounter[0] = mobileCounter[0] + 1;
                else mobileCounter[0] = 1;
              } else if (
                item.salaryExpectation > 5000 &&
                item.salaryExpectation < 10000
              ) {
                if (mobile[1] != undefined)
                  mobile[1] = mobile[1] + item.salaryExpectation;
                else mobile[1] = item.salaryExpectation;

                if (mobileCounter[1] != undefined)
                  mobileCounter[1] = mobileCounter[1] + 1;
                else mobileCounter[1] = 1;
              } else if (
                item.salaryExpectation > 10000 &&
                item.salaryExpectation < 15000
              ) {
                if (mobile[2] != undefined)
                  mobile[2] = mobile[2] + item.salaryExpectation;
                else mobile[2] = item.salaryExpectation;

                if (mobileCounter[2] != undefined)
                  mobileCounter[2] = mobileCounter[2] + 1;
                else mobileCounter[2] = 1;
              } else if (
                item.salaryExpectation > 15000 &&
                item.salaryExpectation < 20000
              ) {
                if (mobile[3] != undefined)
                  mobile[3] = mobile[3] + item.salaryExpectation;
                else mobile[3] = item.salaryExpectation;

                if (mobileCounter[3] != undefined)
                  mobileCounter[3] = mobileCounter[3] + 1;
                else mobileCounter[3] = 1;
              } else if (item.salaryExpectation > 2000) {
                if (mobile[4] != undefined)
                  mobile[4] = mobile[4] + item.salaryExpectation;
                else mobile[4] = item.salaryExpectation;

                if (mobileCounter[4] != undefined)
                  mobileCounter[4] = mobileCounter[4] + 1;
                else mobileCounter[4] = 1;
              }

              break;
            case PrincipalStack.DEVOPS:
              if (item.salaryExpectation < 5000) {
                if (devOps[0] != undefined)
                  devOps[0] = devOps[0] + item.salaryExpectation;
                else devOps[0] = item.salaryExpectation;

                if (devOpsCounter[0] != undefined)
                  devOpsCounter[0] = devOpsCounter[0] + 1;
                else devOpsCounter[0] = 1;
              } else if (
                item.salaryExpectation > 5000 &&
                item.salaryExpectation < 10000
              ) {
                if (devOps[1] != undefined)
                  devOps[1] = devOps[1] + item.salaryExpectation;
                else devOps[1] = item.salaryExpectation;

                if (devOpsCounter[1] != undefined)
                  devOpsCounter[1] = devOpsCounter[1] + 1;
                else devOpsCounter[1] = 1;
              } else if (
                item.salaryExpectation > 10000 &&
                item.salaryExpectation < 15000
              ) {
                if (devOps[2] != undefined)
                  devOps[2] = devOps[2] + item.salaryExpectation;
                else devOps[2] = item.salaryExpectation;

                if (devOpsCounter[2] != undefined)
                  devOpsCounter[2] = devOpsCounter[2] + 1;
                else devOpsCounter[2] = 1;
              } else if (
                item.salaryExpectation > 15000 &&
                item.salaryExpectation < 20000
              ) {
                if (devOps[3] != undefined)
                  devOps[3] = devOps[3] + item.salaryExpectation;
                else devOps[3] = item.salaryExpectation;

                if (devOpsCounter[3] != undefined)
                  devOpsCounter[3] = devOpsCounter[3] + 1;
                else devOpsCounter[3] = 1;
              } else if (item.salaryExpectation > 2000) {
                if (devOps[4] != undefined)
                  devOps[4] = devOps[4] + item.salaryExpectation;
                else devOps[4] = item.salaryExpectation;

                if (devOpsCounter[4] != undefined)
                  devOpsCounter[4] = devOpsCounter[4] + 1;
                else devOpsCounter[4] = 1;
              }

              break;
          }
        });

        fullStack.forEach((element: any, index) => {
          fullStack[index] = element / fullStackCounter[index];
        });

        backEnd.forEach((element: any, index) => {
          backEnd[index] = element / backEndCounter[index];
        });

        frontEnd.forEach((element: any, index) => {
          frontEnd[index] = element / frontEndCounter[index];
        });

        mobile.forEach((element: any, index) => {
          mobile[index] = element / mobileCounter[index];
        });

        devOps.forEach((element: any, index) => {
          devOps[index] = element / devOpsCounter[index];
        });

        const barChartData: ChartConfiguration<'bar'>['data'] = {
          labels: ['0 5k', '5k 10k', '10k 15k', '15k 20k', '20k >'],
          datasets: [
            {
              data: fullStack,
              label: 'Full Stack',
            },
            {
              data: backEnd,
              label: 'Back-End',
            },
            {
              data: frontEnd,
              label: 'Front-End',
            },
            {
              data: mobile,
              label: 'Mobile',
            },
            {
              data: devOps,
              label: 'DevOps',
            },
          ],
        };

        const barChartSalaryRangeData: ChartConfiguration<'bar'>['data'] = {
          labels: ['0 5k', '5k 10k', '10k 15k', '15k 20k', '20k >'],
          datasets: [
            {
              data: fullStackCounter,
              label: 'Full Stack',
            },
            {
              data: backEndCounter,
              label: 'Back-End',
            },
            {
              data: frontEndCounter,
              label: 'Front-End',
            },
            {
              data: mobileCounter,
              label: 'Mobile',
            },
            {
              data: devOpsCounter,
              label: 'DevOps',
            },
          ],
        };

        this.barChartData = barChartData;
        this.barChartSalaryRangeData = barChartSalaryRangeData;
        this.loading = false;
      }
    });
  }
}
