import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { IAdmin } from 'src/app/home/interfaces/IAdmin';
import { ILogin } from 'src/app/login/interfaces/ILogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  createAdmin(admin: IAdmin): Promise<unknown> {
    return this.auth.createUserWithEmailAndPassword(
      admin.email,
      admin.password
    );
  }

  login(login: ILogin): Promise<unknown> {
    return this.auth.signInWithEmailAndPassword(login.email, login.password);
  }

  loginWithGoogle(): Promise<unknown> {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
