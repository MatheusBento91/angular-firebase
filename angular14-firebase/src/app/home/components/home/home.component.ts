import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { MediaMatcher } from '@angular/cdk/layout';

const listSideNav = [
  {
    Name: 'Home',
    Icon: 'home',
    RouterLink: '/home',
  },
  {
    Name: 'User',
    Icon: 'account_circle',
    RouterLink: '/home/user',
  },
  {
    Name: 'Dashboard',
    Icon: 'dashboard',
    RouterLink: '/dashboard',
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy  {

  listSideNav = listSideNav;
  mobileQuery: MediaQueryList;

  localStorageUtils = new LocalStorageUtils();

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logOut() {
    this.localStorageUtils.clearUserData();
    this.router.navigate(['/login']);
  }

}
