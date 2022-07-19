import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { UserResolver } from './services/user.resolver';

const routes: Routes = [
  { path: '', component: ListUserComponent },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    resolve: {
      user: UserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
