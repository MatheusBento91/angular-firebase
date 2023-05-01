import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { filter, find, map, Observable, take } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollections!: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {}

  get(): Observable<IUser[]> {
    return this.afs
      .collection<any>('Users')
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }

  getById(id: string): Observable<IUser> {
    return this.afs
      .collection<any>('Users')
      .doc(id)
      .valueChanges()
      .pipe(take(1));
  }

  getByEmail(email: string): Observable<IUser[]> {
    return this.get().pipe(
      map((users) => users.filter((user) => user.email == email))
    );
  }

  create(user: IUser): Promise<any> {
    const usersRef = this.afs.collection('Users');
    return usersRef.add({ ...user });
  }

  update(id: string, user: IUser): Promise<any> {
    return this.afs
      .collection<IUser>('Users')
      .doc(id)
      .set({ ...user });
  }

  delete(id: string): Promise<any> {
    return this.afs.collection<IUser>('Users').doc(id).delete();
  }
}
