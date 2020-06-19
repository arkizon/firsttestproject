import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {UserProfile} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 private userProfile: AngularFirestoreDocument<UserProfile>;  
 private currentUser: firebase.User;
 editUser: UserProfile
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }
   
 async getUserProfile(): Promise<Observable<UserProfile>>{
   try{
    const user: firebase.User = await this.authService.getUser();
    this.currentUser = user;
    this.userProfile = this.firestore.doc(`userProfile/${user.uid}`);
    return this.userProfile.valueChanges();
   } catch(error){
     throw new Error(error)
   }
    
 }

 updateLastName(lastName: string): Promise<void>{
    try{
      return this.userProfile.update({
         lastName
      })
    } catch(error){
      throw new Error(error)
    }
     
 }
 updateFirstName(firstName: string): Promise<void>{
  try{
    return this.userProfile.update({
      firstName
    })
  } catch(error){
    throw new Error(error)
  }
   
}

 async updateEmail(newEmail: string, password: string): Promise<void>{
          const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password)
         try{
               await this.currentUser.reauthenticateWithCredential(credential);
               await this.currentUser.updateEmail(newEmail);
               return this.userProfile.update({email: newEmail})
         } catch(error){
           throw new Error(error)
         }
 }

 async updatePassword(newPassword: string, oldPassword: string): Promise<void> {
   //this user is about to change a very import security/unique component of the app, make sure they have the right to before you allow it
      const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);
      try{
         await this.currentUser.reauthenticateWithCredential(credential);
         return this.currentUser.updatePassword(newPassword)
      } catch(error){
        throw new Error(error);
      }
 }

}
