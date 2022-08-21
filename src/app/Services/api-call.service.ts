/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

// import {httpClient} from '@angular';
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  renderer: Renderer2;
  constructor(private http: HttpClient,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    public toastController: ToastController,
    private loadingCtrl: LoadingController) {
      this.renderer = this.rendererFactory.createRenderer(null,null);
    }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  routeToSpecificPage(URL: any,dt: any){
    if(dt){
      this.router.navigate([URL,dt]);
    }
    else{
      this.router.navigate([URL]);
    }
  }
  async showLoading(msg){
    const loading = await this.loadingCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: 'custom-loading',
    });
    loading.present();
  }
  stopLoading(){
    this.loadingCtrl.dismiss();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 5000000
    });
    toast.present();
  }
  client_call(flag: any,apiname: any,dt: any){
     if(flag > 0){
       //post
       return this.http.post(`${environment.api_url + apiname}`,dt);
     }
     else{
       //get
       const data =  dt ? dt : '';
       console.log(data);
       return this.http.get(`${environment.api_url+apiname}` + data);

     }
  }
  enableDark(){
    this.renderer.addClass(this.document.body,'dark-theme');
  }
  enableLight(){
    this.renderer.removeClass(this.document.body,'dark-theme');
  }



}
