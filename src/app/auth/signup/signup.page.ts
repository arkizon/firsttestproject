import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { WidgetUtilService } from '../service/widget-util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm:FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private widgetUtilService: WidgetUtilService) { 

    this.signupForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password1: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    password2: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    },{validator: this.checkIfMatchingPasswords('password1', 'password2')} );
  }

  ngOnInit() {
  }


  async signup(signupForm: NgForm){
    console.log(signupForm);
    if(signupForm.value.password1 != signupForm.value.password2 || !signupForm.valid){
      return 
    }
     const password = signupForm.value.password1

    try{
      this.widgetUtilService.presentLoading();
       const userCredential:firebase.auth.UserCredential = await this.authService.signup(
         signupForm.value.email,
         password,
         signupForm.value.firstName,
         signupForm.value.lastName
       );
       this.authService.userId = userCredential.user.uid;
       this.widgetUtilService.dismissLoader();
       this.router.navigate(['/home']);
       this.widgetUtilService.presentToast('signup success, welcome')
    } catch(error){
      this.widgetUtilService.presentToast(error.message)
      console.log(error)
    }

  }

  goToLoginPage(){
    this.router.navigate(['/auth/login']);

  }

  goToForgotPasswordPage(){
    this.router.navigate(['/auth/reset-password'])
  }



  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }



  passwordMatch(controls: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if(this.signupForm.value.password1 != this.signupForm.value.password2){
         reject({'passwordsMustMATCH': true})
      } else{
        resolve(null)
      }
    })
     return promise
  }

}
