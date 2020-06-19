import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { Router } from '@angular/router';
import { ProfileService } from '../service/profile.service';
import { UserProfile } from '../service/user.model';
import { AuthService } from '../service/auth.service';
import { WidgetUtilService } from '../service/widget-util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userProfile: UserProfile
 
  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private widgetUtilService: WidgetUtilService, private loadingCtrl: LoadingController,
    private router: Router, private profileService: ProfileService, private authService: AuthService, private alertCtrl: AlertController) { 
          
  }

   async ngOnInit() {
   
    await this.loadingCtrl.create({
      message:'loading profile....'
    }).then( async loadingEl => {
      loadingEl.present();
      await  this.profileService.getUserProfile().then(profile$ => {
        profile$.subscribe(userProfile => {
          this.userProfile = userProfile;
          this.profileService.editUser = userProfile
        });
        loadingEl.dismiss()
  });
 
    });
    
  
  }

changeProfileImage(){
  console.log('picture changed')
}
 
  async onLogout(){
    try{
      this.widgetUtilService.presentLoading();
      await this.authService.logout();
      this.widgetUtilService.dismissLoader();
      this.router.navigate(['/auth/login']);
      this.widgetUtilService.presentToast('log out successful, see you soon')
    } catch (error){
      this.widgetUtilService.presentToast(error.message)
    }
  
  }



   onEditProfile(){
     this.modalCtrl.create({
      component: ProfileFormComponent
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss()
    }).then(profileData => {
    if(profileData.role === 'confirm'){
      if( profileData.data.firstName){
        this.profileService.updateFirstName(profileData.data.firstName);
      }
      if(profileData.data.lastName){
        this.profileService.updateLastName(profileData.data.lastName)
      }
      if(profileData.data.changeEmail.email  !== '' && profileData.data.changeEmail.password !== ''){
        this.profileService.updateEmail(profileData.data.changeEmail.email, profileData.data.changeEmail.password)
      }
      if(profileData.data.changePassword.oldPassword !== '' && profileData.data.changePassword.newPassword !== ''){
        this.profileService.updatePassword(profileData.data.changePassword.oldPassword, profileData.data.changeEmail.newPassword)
      }
    }
    
    })
  }

  
}
