import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollections!: AngularFirestoreCollection<any>;
  user!: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  list() : Observable<any> {
    return this.afs.collection<any>('Users').valueChanges({ idField: 'id' });
  }

  create(user: any) : Promise<any>{
    const usersRef = this.afs.collection('Users');
    return usersRef.add({ ...user });
  }

}
