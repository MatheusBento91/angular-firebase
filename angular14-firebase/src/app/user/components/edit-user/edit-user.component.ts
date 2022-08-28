import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { PrincipalStack } from '../../enum/principal-stack.enum';
import { UserService } from '../../services/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { User } from '../../interfaces/user';
import { AllTechs } from '../../interfaces/all-techs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  hide = true;
  userForm!: FormGroup;
  user: User;
  id: string;
  loading: boolean = false;
  principalStackEnum = PrincipalStack;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  techCtrl = new FormControl('');
  filteredTechs: Observable<string[]>;
  techs: string[] = [];
  allTechs: string[] = AllTechs;

  @ViewChild('techInput') techInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = this.activeRoute.snapshot.params['id'];
    this.user = this.activeRoute.snapshot.data['user'];

    this.filteredTechs = this.techCtrl.valueChanges.pipe(
      startWith(null),
      map((tech: string | null) =>
        tech ? this._filter(tech) : this.allTechs.slice()
      )
    );
  }

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/\(?([0-9]{2})\)?([ .-]?)([0-9]{5})\2([0-9]{4})/),
        ],
      ],
      salaryExpectation: ['', [Validators.required]],
      principalStack: ['', Validators.required],
      technologies: this.fb.array([]),
    });

    this.userForm.patchValue({
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      salaryExpectation: this.user.salaryExpectation,
      principalStack: this.user.principalStack,
      technologies: [],
    });

    this.user.technologies.forEach((item) => {
      this.techs.push(item.tech);
    });
  }

  get technologiesControl() {
    return this.userForm.controls['technologies'] as FormArray;
  }

  save() {
    this.loading = true;
    this.techs.forEach((tech) => {
      this.technologiesControl.push(
        this.fb.group({
          tech: tech,
        })
      );
    });

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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.techs.push(value);
    }

    event.chipInput!.clear();

    this.techCtrl.setValue(null);
  }

  remove(tech: string): void {
    const index = this.techs.indexOf(tech);

    if (index >= 0) {
      this.techs.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.techs.push(event.option.viewValue);
    this.techInput.nativeElement.value = '';
    this.techCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTechs.filter((tech) =>
      tech.toLowerCase().includes(filterValue)
    );
  }
}
