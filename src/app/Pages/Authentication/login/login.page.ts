/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiCallService } from 'src/app/Services/api-call.service';
import {Http, HttpOptions} from '@capacitor-community/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private api_call: ApiCallService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController) {
      localStorage.clear();
    this.loginForm = this.fb.group({
      user_id:['',Validators.required],
      password:['',Validators.required],
    });
   }

  ngOnInit() {
  }
  async login(){
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait',
      cssClass: 'custom-loading',
    });
    loading.present();
    const formdata = new FormData();
    formdata.append('user_id',this.loginForm.value.user_id);
    formdata.append('password',this.loginForm.value.password);

    this.api_call.postData('/login',formdata).subscribe((res: any) =>{
        loading.dismiss();
         console.log(JSON.parse(res.data));
        if(JSON.parse(res.data).suc > 0){
          localStorage.setItem('user',JSON.stringify(JSON.parse(res.data).msg));
           this.api_call.routeToSpecificPage('/main/',null);
        }
        else{
           this.presentToastWithOptions();
        }
      });
    // this.api_call.client_call(1,'/login',formdata).subscribe((res: any) =>{
    //   console.log(res);
    //   loading.dismiss();
    //   if(res.suc > 0){
    //     localStorage.setItem('user',JSON.stringify(res.msg));
    //      this.api_call.routeToSpecificPage('/main/',null);
    //   }
    //   else{
    //      this.presentToastWithOptions();
    //   }
    // });
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Alert',
      message: 'Wrong Credential',
      icon: 'information-circle',
      animated:true,
      color:'light',
      position: 'top',
      duration:5000,
      buttons: [
         {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
