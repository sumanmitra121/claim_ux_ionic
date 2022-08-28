import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UploadImagePageRoutingModule } from './upload-image-routing.module';
import { UploadImagePage } from './upload-image.page';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import {ImagePicker} from '@awesome-cordova-plugins/image-picker/ngx';
import {Crop} from '@ionic-native/crop/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadImagePageRoutingModule
  ],
  declarations: [UploadImagePage],
  providers: [
    Camera,
    File,
    ImagePicker,
    Crop]
})
export class UploadImagePageModule {}
