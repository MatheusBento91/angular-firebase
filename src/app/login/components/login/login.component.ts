import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ILogin } from '../../interfaces/ILogin';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  localStorageUtils = new LocalStorageUtils();
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authSerivce: AuthService,
    private toastr: ToastrService
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
    this.loading = true;
    const requestLogin: ILogin = Object.assign(
      {},
      this.loginForm.getRawValue()
    );

    this._authSerivce
      .login(requestLogin)
      .then((response) => {
        if (response) {
          this.handlerLogin(response);
        }
      })
      .catch((error) => {
        this.handlerError();
        throw new Error(error);
      });
  }

  loginWithGoogle() {
    this._authSerivce
      .loginWithGoogle()
      .then((response) => {
        if (response) {
          this.handlerLogin(response);
        }
      })
      .catch((error) => {
        this.handlerError();
        throw new Error(error);
      });
  }

  handlerLogin(response: any) {
    const user = response.user.multiFactor.user;

    this.localStorageUtils.saveUser(user.email);
    this.localStorageUtils.saveUserToken(user.accessToken);

    this.toastr.success('Login successfully!', 'Sucess!');
    this.router.navigate(['/home']);
    this.loading = false;
  }

  handlerError() {
    this.toastr.error('Email or password is invalid!', 'Invalid data!');
    this.loading = false;
  }
}
