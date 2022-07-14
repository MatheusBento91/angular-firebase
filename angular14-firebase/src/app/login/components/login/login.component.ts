import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ILogin } from '../../models/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;
  localStorageUtils = new LocalStorageUtils();

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }

  login() {
    let loginForm  = { } as ILogin;
    loginForm = this.loginForm.getRawValue();
    console.log(loginForm);
    this.localStorageUtils.saveUser(loginForm as any);
    this.router.navigate(['/home'])
  }

}
