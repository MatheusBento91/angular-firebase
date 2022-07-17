import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private itemDoc!: AngularFirestoreCollection<any>;
  item!: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  list() : Observable<any> {
    return this.afs.collection<any>('Users').valueChanges({ idField: 'Id' });
  }

}
