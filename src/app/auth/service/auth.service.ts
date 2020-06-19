import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import 'firebase/firestore';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId: string;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

 getUser(): Promise<firebase.User>{
     return this.afAuth.authState.pipe(first()).toPromise()
 }

 getAuthState(){
   return this.afAuth.authState;
 }

login(email: string, password: string): Promise<firebase.auth.UserCredential>{
    try{
       return this.afAuth.signInWithEmailAndPassword(email, password)
    } catch (error){
      throw new Error(error)
    }
       
}

async signup(email: string, password: string, firstName: string, lastName: string): Promise<firebase.auth.UserCredential>{
  try{
    const newUserCredential: firebase.auth.UserCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    await this.firestore.doc(`userProfile/${newUserCredential.user.uid}`)
    .set({
      email, firstName, lastName
    })
    return newUserCredential
  } catch(error) {
    throw new Error(error)
  }
}

resetPassword(email: string): Promise<void>{
  try{
    return this.afAuth.sendPasswordResetEmail(email)
  } catch(error){
    throw new Error(error)
  }
}

logout():Promise<void> {
  return this.afAuth.signOut()
}

}
