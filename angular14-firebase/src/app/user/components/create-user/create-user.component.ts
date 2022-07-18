import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  hide = true;
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      salaryExpectation: ['', [Validators.required]]
    });
  }

  save() {
    const userForm: any = this.userForm.getRawValue();
    console.log(userForm);

    this._userService.create(userForm).then( (response) => {
      console.log(response);
      if (response) {
        this.toastr.success('User create successfully!', 'Sucess!');
        this.router.navigate(['/home/user']);
      }
    },
    (error) => {
      this.toastr.error('Error for create user', 'Error!');
      throw new Error(error);
    });

  }
}
