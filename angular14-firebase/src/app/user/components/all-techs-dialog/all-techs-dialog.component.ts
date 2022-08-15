import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-all-techs-dialog',
  templateUrl: './all-techs-dialog.component.html',
  styleUrls: ['./all-techs-dialog.component.scss']
})
export class AllTechsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
  public dialogRef: MatDialogRef<AllTechsDialogComponent>,) { }

}
