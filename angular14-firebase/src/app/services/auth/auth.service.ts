import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private auth: AngularFireAuth) {}

  createUser(user: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(login: any): Promise<any> {
    return this.auth.signInWithEmailAndPassword(login.email, login.password);
  }

  loginWithGoogle(): Promise<any> {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Promise<any> {
    return this.auth.signOut();
  }
}
