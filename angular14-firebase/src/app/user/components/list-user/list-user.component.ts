import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

export interface UserData {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  salaryExpectation: number;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'phoneNumber',
    'salaryExpectation',
    'actions',
  ];
  dataSource!: MatTableDataSource<UserData>;
  loading: boolean = false;

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
    this.userService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  registerUser() {
    this.router.navigate(['home/user/create-user']);
  }

  editUser(user: any) {
    this.router.navigate([`home/user/edit-user/${user.id}`]);
  }

  deleteUser(user: any) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastr.success('User deleted successfully!', 'Sucess!');
      }
    });
  }
}
