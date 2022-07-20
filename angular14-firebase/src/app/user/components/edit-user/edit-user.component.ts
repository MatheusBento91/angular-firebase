import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  hide = true;
  userForm!: FormGroup;
  user: any;
  id: string;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = this.activeRoute.snapshot.params['id'];
    this.user = this.activeRoute.snapshot.data['user'];
  }

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      salaryExpectation: ['', [Validators.required]],
    });

    this.userForm.patchValue({
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      salaryExpectation: this.user.salaryExpectation,
    });
  }

  save() {
    this.loading = true;
    const userForm: any = this.userForm.getRawValue();
    this._userService.update(this.id, userForm).then(
      () => {
        this.loading = false;
        this.toastr.success('User updated successfully!', 'Sucess!');
        this.router.navigate(['/home/user']);
      },
      (error) => {
        this.loading = false;
        this.toastr.error('Error for updated user', 'Error!');
        throw new Error(error);
      }
    );
  }
}
