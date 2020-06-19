import { Injectable } from '@angular/core';
import {ToastController, LoadingController, AlertController, Platform} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class WidgetUtilService {
 loading: any = {}
  constructor(
    private toastCtrl: ToastController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private platform: Platform
  ) { }

async presentToast(message){
    const toast = await this.toastCtrl.create({
       message,
       duration: 3000, 
       position: this.platform.is('desktop') ? 'top': 'bottom'
    });
    toast.present();
}


async presentLoading(){
  this.loading = await this.loadingCtrl.create({
    message: 'please wait.....',
    translucent: true,
  });
  return await this.loading.present();
}

async dismissLoader(){
  await this.loading.dismiss();
}

async presentAlertConfirm(header, message, buttons){
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons
    });
    await alert.present();
}

}
