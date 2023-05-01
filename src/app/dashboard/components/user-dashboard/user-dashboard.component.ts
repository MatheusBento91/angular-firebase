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

  //backgroundColor
  backgroundColor: string[] = [
    '#DC7633',
    '#16A085',
    '#95A5A6',
    '#2196F3',
    '#AF7AC5',
  ];
  hoverBackgroundColor: string[] = [
    '#A04000',
    '#0E6655',
    '#717D7E',
    '#01579B',
    '#76448A',
  ];
  hoverBorderColor: string[] = [
    '#A04000',
    '#0E6655',
    '#717D7E',
    '#01579B',
    '#76448A',
  ];

  fullStack: number[] = [];
  fullStackCounter: number[] = [];
  backEnd: number[] = [];
  backEndCounter: number[] = [];
  frontEnd: number[] = [];
  frontEndCounter: number[] = [];
  mobile: number[] = [];
  mobileCounter: number[] = [];
  devOps: number[] = [];
  devOpsCounter: number[] = [];

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
    this.getUsers();
  }

  doughnutChartClicked(e: any) {}

  getUsers() {
    this.userService.get().subscribe((data) => {
      if (data) {
        this.loading = true;

        this.setUsersAverageSalary(data);
        this.setUsersPrincipalStack(data);
        this.setUsersLevel(data);

        this.loading = false;
      }
    });
  }

  setUsersAverageSalary(data: any) {
    data.forEach((item: any) => {
      switch (item.principalStack) {
        case PrincipalStack.FULLTSACK:
          this.setAvarageAndRangeSalary(item,this.fullStack,this.fullStackCounter);
          break;
        case PrincipalStack.BACKEND:
          this.setAvarageAndRangeSalary(item,this.backEnd,this.backEndCounter);
          break;
        case PrincipalStack.FRONTEND:
          this.setAvarageAndRangeSalary(item,this.frontEnd,this.frontEndCounter);
          break;
        case PrincipalStack.MOBILE:
          this.setAvarageAndRangeSalary(item, this.mobile, this.mobileCounter);
          break;
        case PrincipalStack.DEVOPS:
          this.setAvarageAndRangeSalary(item, this.devOps, this.devOpsCounter);
          break;
      }
    });

    this.fullStack.forEach((element: any, index) => {
      this.fullStack[index] = element / this.fullStackCounter[index];
    });

    this.backEnd.forEach((element: any, index) => {
      this.backEnd[index] = element / this.backEndCounter[index];
    });

    this.frontEnd.forEach((element: any, index) => {
      this.frontEnd[index] = element / this.frontEndCounter[index];
    });

    this.mobile.forEach((element: any, index) => {
      this.mobile[index] = element / this.mobileCounter[index];
    });

    this.devOps.forEach((element: any, index) => {
      this.devOps[index] = element / this.devOpsCounter[index];
    });

    this.barChartData = {
      labels: ['0 5k', '5k 10k', '10k 15k', '15k 20k', '20k >'],
      datasets: [
        {
          data: this.fullStack,
          label: PrincipalStack.FULLTSACK,
        },
        {
          data: this.backEnd,
          label: PrincipalStack.BACKEND,
        },
        {
          data: this.frontEnd,
          label: PrincipalStack.FRONTEND,
        },
        {
          data: this.mobile,
          label: PrincipalStack.MOBILE,
        },
        {
          data: this.devOps,
          label: PrincipalStack.DEVOPS,
        },
      ],
    };

    this.setUsersSalaryRange();
  }

  setUsersLevel(data: any) {
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
        backgroundColor: this.backgroundColor,
        hoverBackgroundColor: this.hoverBackgroundColor,
        hoverBorderColor: this.hoverBorderColor,
      },
    ];
  }

  setUsersPrincipalStack(data: any) {
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

    this.doughnutChartDatasets = [
      {
        label: 'Stack',
        data: [fullStack, backEnd, frontEnd, mobile, devOps],
        backgroundColor: this.backgroundColor,
        hoverBackgroundColor: this.hoverBackgroundColor,
        hoverBorderColor: this.hoverBorderColor,
      },
    ];
  }

  setAvarageAndRangeSalary(item: any, stack: any, stackCounter: any) {
    if (item.salaryExpectation < 5000) {
      if (stack[0] != undefined) stack[0] = stack[0] + item.salaryExpectation;
      else stack[0] = item.salaryExpectation;

      if (stackCounter[0] != undefined) stackCounter[0] = stackCounter[0] + 1;
      else stackCounter[0] = 1;
    } else if (
      item.salaryExpectation > 5000 &&
      item.salaryExpectation < 10000
    ) {
      if (stack[1] != undefined) stack[1] = stack[1] + item.salaryExpectation;
      else stack[1] = item.salaryExpectation;

      if (stackCounter[1] != undefined) stackCounter[1] = stackCounter[1] + 1;
      else stackCounter[1] = 1;
    } else if (
      item.salaryExpectation > 10000 &&
      item.salaryExpectation < 15000
    ) {
      if (stack[2] != undefined) stack[2] = stack[2] + item.salaryExpectation;
      else stack[2] = item.salaryExpectation;

      if (stackCounter[2] != undefined) stackCounter[2] = stackCounter[2] + 1;
      else stackCounter[2] = 1;
    } else if (
      item.salaryExpectation > 15000 &&
      item.salaryExpectation < 20000
    ) {
      if (stack[3] != undefined) stack[3] = stack[3] + item.salaryExpectation;
      else stack[3] = item.salaryExpectation;

      if (stackCounter[3] != undefined) stackCounter[3] = stackCounter[3] + 1;
      else stackCounter[3] = 1;
    } else if (item.salaryExpectation > 2000) {
      if (stack[4] != undefined) stack[4] = stack[4] + item.salaryExpectation;
      else stack[4] = item.salaryExpectation;

      if (stackCounter[4] != undefined) stackCounter[4] = stackCounter[4] + 1;
      else stackCounter[4] = 1;
    }
  }

  setUsersSalaryRange() {
    this.barChartSalaryRangeData = {
      labels: ['0 5k', '5k 10k', '10k 15k', '15k 20k', '20k >'],
      datasets: [
        {
          data: this.fullStackCounter,
          label: PrincipalStack.FULLTSACK,
        },
        {
          data: this.backEndCounter,
          label: PrincipalStack.BACKEND,
        },
        {
          data: this.frontEndCounter,
          label: PrincipalStack.FRONTEND,
        },
        {
          data: this.mobileCounter,
          label: PrincipalStack.MOBILE,
        },
        {
          data: this.devOpsCounter,
          label: PrincipalStack.DEVOPS,
        },
      ],
    };
  }
}
