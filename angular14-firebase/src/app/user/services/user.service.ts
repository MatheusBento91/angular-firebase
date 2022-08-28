import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable, take } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollections!: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {}

  list(): Observable<User[]> {
    return this.afs
      .collection<any>('Users')
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1)
      );
  }

  create(user: User): Promise<any> {
    const usersRef = this.afs.collection('Users');
    return usersRef.add({ ...user });
  }

  getById(id: string): Observable<User> {
    return this.afs
      .collection<any>('Users')
      .doc(id)
      .valueChanges()
      .pipe(take(1));
  }

  update(id: string, user: User): Promise<any> {
    return this.afs
      .collection<any>('Users')
      .doc(id)
      .set({ ...user });
  }

  delete(id: string): Promise<any> {
    return this.afs.collection<any>('Users').doc(id).delete();
  }
}
