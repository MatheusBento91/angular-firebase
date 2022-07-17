import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {
    console.log("testedsadsa");

    const user = this.userSerivce.list().subscribe( (data) => {
      console.log(data);
    });
  }

}
