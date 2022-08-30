import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-all-techs-dialog',
  templateUrl: './all-techs-dialog.component.html',
  styleUrls: ['./all-techs-dialog.component.scss']
})
export class AllTechsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser,
  public dialogRef: MatDialogRef<AllTechsDialogComponent>,) { }

}
