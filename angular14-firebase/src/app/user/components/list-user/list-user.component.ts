import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../services/user.service';
import { AllTechsDialogComponent } from '../all-techs-dialog/all-techs-dialog.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'salaryExpectation',
    'principalStack',
    'level',
    'allTechs',
    'actions',
  ];
  listUser!: IUser[];
  dataSource!: MatTableDataSource<IUser>;
  loading: boolean = false;
  loadingFilter: boolean = false;

  filter: string = '';
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  showFirstLastButtons = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.get();
  }

  get() {
    this.userService.get().subscribe((data) => {
      this.handlerTable(data);
      this.loading = false;
      this.loadingFilter = false;
    });
  }

  getByEmail(email: any) {
    this.loadingFilter = true;
    if (email == '') {
      this.get();
    } else {
      this.userService.getByEmail(email).subscribe((data) => {
        this.handlerTable(data);
        this.loadingFilter = false;
      });
    }
  }

  handlerTable(data: IUser[]) {
    this.length = data.length;
    this.listUser = data;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.iterator();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filter = '';
    this.iterator();
  }

  private iterator() {
    const end = (this.pageIndex + 1) * this.pageSize;
    const start = this.pageIndex * this.pageSize;
    const part = this.listUser.slice(start, end);
    this.dataSource = new MatTableDataSource(part);
  }

  registerUser() {
    this.router.navigate(['home/user/create-user']);
  }

  editUser(user: IUser) {
    this.router.navigate([`home/user/edit-user/${user.id}`]);
  }

  deleteUser(user: IUser) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.get();
        this.toastr.success('User deleted successfully!', 'Sucess!');
      }
    });
  }

  openAllTechs(user: IUser) {
    this.dialog.open(AllTechsDialogComponent, {
      data: user,
    });
  }
}
