/* eslint-disable no-underscore-dangle */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

import { ApiCallService } from 'src/app/Services/api-call.service';
 class ProjectName {
  public created_by: string;
  public created_dt: string;
  public dist: string;
  public id: string;
  public modified_by: string;
  public modified_dt: string;
  public project_cd: string;
  public project_name: string;
  public project_type: string;
}
class purpose_details {
  public purpose_desc: string;
  public id: string
}
class c_heads {
  public head_desc: string;
  public head_cd: string;
  public active_flag: string;
  public id: string
}
@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.page.html',
  styleUrls: ['./add-claim.page.scss'],
})
export class AddClaimPage implements OnInit {
  c_head:c_heads[];
  p_desc:purpose_details[];
  p_name: ProjectName[];

  claimForms: FormGroup;
  title: any;
  constructor(private fb: FormBuilder,
    public toastController: ToastController,
    private loadingCtrl: LoadingController,
    private datePipe: DatePipe,
    private router: ActivatedRoute,
    private api_call: ApiCallService) {
      this.title = Number(this.router.snapshot.params.id) > 0 ? 'Edit Claims' : 'Add Claims';

    this.claimForms = this.fb.group({
        current_date:[this.datePipe.transform(new Date(),'dd/MM/YYYY')],
        project_name:['',Validators.required],
        frm_dt:['',Validators.required],
        to_dt:['',Validators.required],
        purpose:['',Validators.required],
        narration:['',Validators.required],
        claim_total:[0],
        claim_dtls:this.fb.array([])
    });
    this.getProjectNames();
    this.purposDetails();
    this.claimHeads();

  }
  get claimDtls() : FormArray {
    return this.claimForms.get("claim_dtls") as FormArray;
  }
 //For add pupose
  newclaimDtls(): FormGroup {
    return this.fb.group({
      head: ['',Validators.required],
      amount: [0,Validators.required],
      remarks: ['',Validators.required],
    });
 }
 addClaimDtls() {
  this.claimDtls.push(this.newclaimDtls());
}

 //For edit pupose
 setClaimData(  head, amount, remarks): FormGroup{
  return this.fb.group({
    head: [head,Validators.required],
    amount: [amount,Validators.required],
    remarks: [remarks,Validators.required],
  });
 }



removeClaimDtls(i:number) {
  this.claimDtls.removeAt(i);
  this.calculateClaimTotal();
}
 async ngOnInit() {
        if(Number(this.router.snapshot.params.id) > 0){
        const loading = await this.loadingCtrl.create({
          message: 'Loading',
          duration: 3000,
          cssClass: 'custom-loading',
        });
        loading.present();
        this.api_call.getData('/claim_details?id='+Number(this.router.snapshot.params.id)).subscribe((res:any) =>{
          console.log(JSON.parse(res.data));
          if(JSON.parse(res.data).cltrans.length > 0){
            JSON.parse(res.data).cltrans.forEach((element: any) => {
                      this.claimDtls.push(this.setClaimData(element.claim_hd,Number(element.amount),element.remarks))
                });
             this.calculateClaimTotal();
           }
           setTimeout(()=>{
            this.claimForms.patchValue({
              project_name:this.p_name.find((x:any) => x.project_name === JSON.parse(res.data).claim.project_name),
              frm_dt:JSON.parse(res.data).claim.from_dt,
              to_dt:JSON.parse(res.data).claim.to_dt,
              purpose:this.p_desc.find((x:any) => x.purpose_desc === JSON.parse(res.data).claim.purpose),
              narration:JSON.parse(res.data).claim.narration,
             })
             loading.dismiss();
           },500)

         },error=>{
          loading.dismiss();
        })
        //  this.api_call.client_call(0,'/claim_details','?id='+Number(this.router.snapshot.params.id)).subscribe((res:any) =>{
        //   if(res.cltrans.length > 0){
        //        res.cltrans.forEach((element: any) => {
        //               this.claimDtls.push(this.setClaimData(element.claim_hd,Number(element.amount),element.remarks))
        //         });
        //      this.calculateClaimTotal();
        //    }
        //    setTimeout(()=>{
        //     this.claimForms.patchValue({
        //       project_name:this.p_name.find((x:any) => x.project_name === res.claim.project_name),
        //       frm_dt:res.claim.from_dt,
        //       to_dt:res.claim.to_dt,
        //       purpose:this.p_desc.find((x:any) => x.purpose_desc === res.claim.purpose),
        //       narration:res.claim.narration,
        //      })
        //      loading.dismiss();
        //    },500)

        //  },error=>{
        //   loading.dismiss();
        //  });
       }
       else{
         this.addClaimDtls();
        }

  }
 async ClaimsData(){
   console.log(this.claimForms.value);

    const loading = await this.loadingCtrl.create({
      message: 'Please Wait',
      duration: 3000,
      cssClass: 'custom-loading',
    });
    loading.present();
    var amount = [];
    var chead = [];
    var remarks = [];
    this.claimForms.value.claim_dtls.forEach((element,index) => {
      amount.push(element.amount);
      remarks.push(element.remarks);
      chead.push(element.head);
      });
    const formdata = new FormData();
    formdata.append('date1',this.claimForms.value.frm_dt);
     var project_name = {
       pName:this.claimForms.value.project_name.project_name,
       pType:this.claimForms.value.project_name.project_type}
    formdata.append('projectName',JSON.stringify(project_name));
    formdata.append('purpose',this.claimForms.value.purpose.purpose_desc);
    formdata.append('date2',this.claimForms.value.to_dt);
    formdata.append('narration',this.claimForms.value.narration);
    formdata.append('amount',JSON.stringify(amount));
    formdata.append('remarks',JSON.stringify(remarks));
    formdata.append('chead',JSON.stringify(chead));
    formdata.append('emp_no',JSON.parse(localStorage.getItem('user')).emp_no);
    formdata.append('emp_name',JSON.parse(localStorage.getItem('user')).emp_name);
    this.api_call.postData('/csave',formdata).subscribe((res:any) =>{
         loading.dismiss();
        if(JSON.parse(res.data).suc > 0){
              this.presentToastWithOptions('Claims Successfully Submitted');
              this.api_call.routeToSpecificPage('/main/claim_dashboard',null);
        }
        else{
          this.presentToastWithOptions('Claims Submission Failed');
        }
    })

    // this.api_call.client_call(1,'/csave',formdata).subscribe((res:any) => {
    //   loading.dismiss();
    //   if(res.suc > 0){
    //     this.presentToastWithOptions('Claims Successfully Submitted');
    //     this.api_call.routeToSpecificPage('/main/claim_dashboard',null);
    //   }
    //   else{
    //     this.presentToastWithOptions('Claims Submission Failed');
    //   }

    // })

  }

  calculateClaimTotal(){
    var count = 0;
    this.claimForms.value.claim_dtls.forEach((element:any) => {
        count = Number(element.amount) + count;
    });
    this.claimForms.patchValue({claim_total:count})
  }
  getProjectNames(){
    this.api_call.getData('/projectsName').subscribe((res:any) =>{
      this.p_name = JSON.parse(res.data).msg
   })
    // this.api_call.client_call(0,'/projectsName',null).subscribe((res:any) =>{
    //    this.p_name = res.msg;
    //    console.log(this.p_name);

    // })
  }
  purposDetails(){
    // this.api_call.client_call(0,'/purpose',null).subscribe((res:any) =>{
    //    this.p_desc = res.msg;
    // })
    this.api_call.getData('/purpose').subscribe((res:any) =>{
      this.p_desc = JSON.parse(res.data).msg
   })
  }
  claimHeads(){
    // this.api_call.client_call(0,'/cheads',null).subscribe((res:any) =>{
    //  this.c_head = res.msg
    // })
    this.api_call.getData('/cheads').subscribe((res:any) =>{
      this.c_head = JSON.parse(res.data).msg
   })
  }
  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      header: 'Message From Synergic',
      message: msg,
      icon: 'information-circle',
      animated:true,
      color:'light',
      position: 'top',
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
