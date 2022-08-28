import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IAdmin } from '../../interfaces/admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
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
    this.createAdminForm();
  }

  createAdminForm() {
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
    const adminForm: IAdmin = this.adminForm.getRawValue();
    this._authService.createAdmin(adminForm).then(
      () => {
        this.toastr.success('Create admin successfully!', 'Sucess!');
        this.router.navigate(['/home']);
      },
      (error) => {
        this.toastr.error('Email or password is invalid!', 'Invalid data!');
        throw new Error(error);
      }
    );
  }
}
