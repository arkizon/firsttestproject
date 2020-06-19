import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertController } from '@ionic/angular';
import { WidgetUtilService } from '../service/widget-util.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
 resetPasswordForm: FormGroup;
  constructor( private formBuilder: FormBuilder, private router: Router, private widgetUtilService: WidgetUtilService,
     private authService: AuthService, private alertCtrl: AlertController) { 

    this.resetPasswordForm = this.formBuilder.group({
     email: ['', Validators.compose([Validators.email, Validators.required])]
    })
  }

  ngOnInit() {
  }

  async resetPassword(resetPasswordForm: NgForm){
    console.log(resetPasswordForm);
    try{
        this.widgetUtilService.presentLoading();
         await this.authService.resetPassword(resetPasswordForm.value.email);
         this.widgetUtilService.dismissLoader();
         const alert = await this.alertCtrl.create({
           message: 'check your inbox for the password reset link',
           buttons: [
             {
               text: 'ok',
               role: 'cancel',
               handler: () => {
                 this.router.navigate(['/auth/login']);
               }
             }
           ]
         });
         await alert.present();

    } catch(error){
      this.widgetUtilService.presentToast(error.message)
      console.log(error)
    }

    this.router.navigate(['/auth/login']);
  }

}
