import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<any> {
  constructor(private _userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this._userService.getById(route.params['id']);
  }
}
