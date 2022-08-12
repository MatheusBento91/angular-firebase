import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  localStorageUtils = new LocalStorageUtils();

  canActivate():  boolean {

    if (this.localStorageUtils.getUserToken()) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }

}
