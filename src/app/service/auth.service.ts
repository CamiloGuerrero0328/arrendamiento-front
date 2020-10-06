import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public angularFireAuth:AngularFireAuth) { }

  public createUser(email:string, password:string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  public loginWithEmilPassword(email:string, password:string){
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  public singOut(){
    return this.angularFireAuth.signOut();
  }
}
