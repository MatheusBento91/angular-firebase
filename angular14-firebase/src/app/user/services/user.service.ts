import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollections!: AngularFirestoreCollection<any>;
  user!: Observable<any>;

  constructor(private afs: AngularFirestore) {}

  list(): Observable<any> {
    return this.afs.collection<any>('Users').valueChanges({ idField: 'id' });
  }

  create(user: any): Promise<any> {
    const usersRef = this.afs.collection('Users');
    return usersRef.add({ ...user });
  }

  getById(id: string): Observable<User> {
    return this.afs.collection<any>('Users').doc(id).valueChanges();
  }

  update(id: string, user: any) : Promise<any> {
    return this.afs.collection<any>('Users').doc(id).set({ ...user});
  }

  delete(id: string) : Promise<any> {
    return this.afs.collection<any>('Users').doc(id).delete();
  }
}
