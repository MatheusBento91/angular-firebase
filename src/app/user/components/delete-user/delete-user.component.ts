import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser,
  public dialogRef: MatDialogRef<DeleteUserComponent>,
  private _userService: UserService) { }

  onClick(): void {
    this._userService.delete(this.data.id);
    this.dialogRef.close(true);
  }

}
