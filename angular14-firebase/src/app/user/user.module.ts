import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { SharedModule } from '../shared/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { AllTechsDialogComponent } from './components/all-techs-dialog/all-techs-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ListUserComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    AllTechsDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FlexLayoutModule,
    SharedModule,
    NgxMaskModule.forChild()
  ]
})
export class UserModule { }
