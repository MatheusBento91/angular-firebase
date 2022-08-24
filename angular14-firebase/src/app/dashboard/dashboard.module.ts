import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

import {SharedModule } from '../shared/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
