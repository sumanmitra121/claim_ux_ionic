/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiCallService } from 'src/app/Services/api-call.service';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
class cltrans{
  amount: string;
  claim_cd: string;
  claim_dt: string;
  claim_hd: string;
  emp_no: string;
  remarks: string;
  sl_no: string;
}
class claim{
  amount: string;
    approval_dt: string;
    approval_status: string;
    approved_by: string;
    claim_cd: string;
    claim_dt: string;
    created_by: string;
    created_dt: string;
    emp_no: string;
    from_dt: string;
    modified_by: string;
    modified_dt: string;
    narration: string;
    project_name: string;
    project_type: string;
    purpose: string;
    rejected_by: string;
    rejected_dt: string;
    rejection_remarks: string;
    rejection_status: string;
    to_dt: string;
}
class main{
  claim: claim;
  cltrans: cltrans[];
}
@Component({
  selector: 'app-claim-dashboard',
  templateUrl: './claim-dashboard.page.html',
  styleUrls: ['./claim-dashboard.page.scss'],
})
export class ClaimDashboardPage implements OnInit {
  @ViewChild('myTable') table: DatatableComponent;
  title: any='Claims';
  _backup_user: any=[];
  setDataForPrint: main;
  isModalOpen=false;
  tableStyle='bootstrap';
   users: any=[];
  constructor(private api_call: ApiCallService,public printer: Printer) {
    this.fetchdata();
  }

  ngOnInit() { }

  changeTableStyle(){
     this.tableStyle = this.tableStyle === 'material' ? 'bootstrap' : 'material';
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this._backup_user.filter((d: any)=>{
      return (d.claim_cd.toLowerCase().indexOf(val) !== -1 || !val);
    });
    // update the rows
    this.users = temp;
  }
  cancel(){
    this.users = this._backup_user;
  }
  fetchdata(){
    this.api_call.getData('/claim_details?emp_no='+JSON.parse(localStorage.getItem('user')).emp_no).subscribe((res: any)=>{
       this._backup_user = JSON.parse(res.data).msg;
       this.users = JSON.parse(res.data).msg;
    });
    // this.api_call.client_call(0,'/claim_details','?emp_no='+JSON.parse(localStorage.getItem('user')).emp_no).subscribe((res: any) =>{
    //   this.users = res.msg;
    //   this._backup_user = res.msg;

    // });
  }

  setOpen(isOpen,claim_cd){
    if(claim_cd > 0){
    //API GET CALLED
    this.api_call.getData('/claim_details?id='+claim_cd).subscribe((res: any)=>{
      this.setDataForPrint = JSON.parse(res.data);
      this.isModalOpen = isOpen;
   });
    // this.api_call.client_call(0,'/claim_details','?id='+claim_cd).subscribe((res: any) =>{
    //   console.log(res);
    //   this.setDataForPrint = res;
    //   this.isModalOpen = isOpen;

    // });
    }
    else{
      console.log('asdas');
      this.isModalOpen = isOpen;
    }
  }
  print(){
    this.printer.isAvailable().then((onSuccess: any) => {
      const content = document.getElementById('printClaim').innerHTML;
      const options: PrintOptions = {
      name: 'MyDocument',
      duplex: true,
      orientation: 'portrait',
      monochrome: true
      };
      this.printer.print(content, options).then((value: any) => {
      console.log('value:', value);
      }, (error) => {
      console.log('eror:', error);
      });
      }, (err) => {
      console.log('err:', err);
      });
  }
}
