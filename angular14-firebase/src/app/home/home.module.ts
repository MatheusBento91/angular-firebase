import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared/shared.module';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [HomeComponent, WellcomeComponent, AdminComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
