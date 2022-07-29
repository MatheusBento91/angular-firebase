import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from '../../utils/localstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  localStorageUtils = new LocalStorageUtils();

  canActivate():  boolean {

    if (this.localStorageUtils.getUserToken()) {
      return true;
    }

    this.router.navigate(['/access-denied']);
    return false;
  }

}
