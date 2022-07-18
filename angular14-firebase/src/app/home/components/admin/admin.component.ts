import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  hide = true;
  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.adminForm = this.fb.group({
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

  save() {
    const userForm : any = this.adminForm.getRawValue();
    this._authService.createUser(userForm).then( () => {
      this.toastr.success('Create admin successfully!', 'Sucess!');
      this.router.navigate(['/home']);
    },
    (error) => {
      this.toastr.error('Email or password is invalid!', 'Invalid data!');
      throw new Error(error);
    });

    //this.router.navigate(['/home'])
  }


}
