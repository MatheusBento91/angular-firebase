import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ILogin } from '../../models/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authSerivce: AuthService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  login() {
    const requestLogin: ILogin = Object.assign(
      {},
      this.loginForm.getRawValue()
    );

    this._authSerivce.login(requestLogin).then(
      (response) => {
        if (response) {
          this.localStorageUtils.saveUser(response.user.multiFactor.user.email);
          this.localStorageUtils.saveUserToken(
            response.user.multiFactor.user.accessToken
          );
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
