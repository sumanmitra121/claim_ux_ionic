/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagePicker, ImagePickerOptions } from '@awesome-cordova-plugins/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {
  mainImages: any=[];
  croppedImagepath = '';
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  //For Cropping
  imageOptions: CropOptions ={
    quality: 80,
    targetWidth: -1,
    targetHeight: -1
  };
  imageurl: any = [];
  securepath: any = window;
  url: any = [];
  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private domsanitize: DomSanitizer
  ) { }

  ngOnInit() {
  }
  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          // this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          this.pickimageFromLibrary();
          console.log('Image Selected from gallery');
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          console.log('Image Selected from camera');
          this.chooseFromCamera(this.camera.PictureSourceType.CAMERA);
          // this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  //Choose from camera
  chooseFromCamera(sourceType){
    const options: CameraOptions = {
      quality:100,
      mediaType:this.camera.MediaType.PICTURE,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG,
      sourceType:sourceType
    };
   this.camera.getPicture(options).then((result) =>{
        console.log('Camera URL',result);
        if(result.hasPermission !== false){
          console.log(result);

          this.cropimage(result);
        }
   },
   error=>{
     console.log(error);
   });
  }
  santizeUrl(imageUrl){
    return this.domsanitize.bypassSecurityTrustUrl(imageUrl);
  }
  //Choose from library
  pickimageFromLibrary(){
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount:3,

    };
    this.imagePicker.getPictures(options).then((imageresult) =>{
      console.log('image Picker Results', imageresult);
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0; i<imageresult.length; i++){
         this.url.push(this.securepath.Ionic.WebView.convertFileSrc(imageresult[i]));
        this.file.resolveLocalFilesystemUrl(imageresult[i]).then((entry: FileEntry)=>{
          entry.file((fl)=>{
            // console.log('return entry File:', fl);
            this.mainImages.push(fl);
          });
        });
      }
    },
    error=>{
      console.log(error);
    });
  }
  cropimage(imageurl){
    this.crop.crop(imageurl,   this.imageOptions).then((crop)=>{

     console.log('Cropped Image:', crop);
     this.imageurl.push(this.securepath.Ionic.WebView.convertFileSrc(crop));
     console.log('Cropped Image02:', crop.split('?')[0]);
     this.getimagefile(crop);
    },error=>{
      console.log('error croping Image', error);
    });
  }

  getimagefile(imageurl){
    const file = this.file.resolveLocalFilesystemUrl(imageurl).then((entry: FileEntry)=>{
        entry.file((fl)=>{
          console.log('return entry File:', fl);
          this.mainImages.push(fl);
           },
         error=>{
           console.log('error accessing the image entry files', error);
        });
    });
   }
}

