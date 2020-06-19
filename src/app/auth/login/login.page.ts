import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { WidgetUtilService } from '../service/widget-util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private widgetUtilService: WidgetUtilService
  ) { 
   this.loginForm = new FormGroup({
     'email': new FormControl(null, [Validators.email, Validators.required]),
     'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
   })
  }

  ngOnInit() {
  }

  async login(loginForm: NgForm){
    console.log(loginForm)
    try{
      this.widgetUtilService.presentLoading();
      const userCredential: firebase.auth.UserCredential = await this.authService.login(
        loginForm.value.email,
        loginForm.value.password
      );
      this.authService.userId = userCredential.user.uid;
      this.widgetUtilService.presentToast('logiing success, welcome');
      this.widgetUtilService.dismissLoader();
      this.router.navigate(['/home'])
    } catch(error){
      this.widgetUtilService.presentToast(error.message)
      console.log(error)
    }
  }


  goToSignupPage(){
  this.router.navigate(['/auth/signup'])
  }

  goToForgotPasswordPage(){
     this.router.navigate(['/auth/reset-password']);
  }
}
