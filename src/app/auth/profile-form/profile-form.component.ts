import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserProfile } from '../service/user.model';
import { ProfileService } from '../service/profile.service';
import { WidgetUtilService } from '../service/widget-util.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
 userProfile: UserProfile
 profileForm:FormGroup
 
  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private profileService: ProfileService, private widgetUtilService: WidgetUtilService) { 
    
    this.userProfile =  this.profileService.editUser;
     

  
  this.profileForm = new FormGroup({
    
    'firstName': new FormControl(this.userProfile.firstName, [Validators.required] ),
    'lastName': new FormControl(this.userProfile.lastName, [Validators.required]),
    'changeEmail': new FormGroup({
      'email': new FormControl(this.userProfile.email, [ Validators.email]),
      'password': new FormControl(null, [ Validators.minLength(6)])
    }),
    'changePassword': new FormGroup({
      'oldPassword': new FormControl(null, [ Validators.minLength(6)]),
      'newPassword': new FormControl(null, [ Validators.minLength(6)])
    })
  })
 
}

   ngOnInit() {
    // this.widgetUtilService.dismissLoader();

  }


  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel')
  }

 async  profileEdited(){
      const updatedProfile = {};
      for (const formField in this.profileForm.controls){
        const control = this.profileForm.controls[formField];
        if(control.dirty){
          updatedProfile[formField] = control.value;
        }
      }
    await this.modalCtrl.dismiss(updatedProfile, 'confirm')
    this.widgetUtilService.presentToast('profile saved!')
  }

}
