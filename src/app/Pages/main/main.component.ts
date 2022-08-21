/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/Services/api-call.service';
import menu from '../../../assets/JSON/menu.json';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  GetReports: any=[];
  reports_Form: FormGroup;
  selected_menu: any;
  isModalOpen = false;
  public menus = menu;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private fb: FormBuilder,private api_call: ApiCallService) {
    this.reports_Form = this.fb.group({
      frm_dt:['',Validators.required],
      to_dt:['',Validators.required]
    });
    console.log(this.menus);
   }

  ngOnInit() {}
  setOpen(isOpen: boolean,menu_name: any) {
    this.isModalOpen = isOpen;
    this.selected_menu = menu_name;
  }
  submit_reports(){
    console.log(this.reports_Form);
     this.api_call.client_call(0,'/claim_details','?emp_no='+ JSON.parse(localStorage.getItem('user')).emp_no + '&flag=1&from_dt='+this.reports_Form.value.frm_dt+'&to_dt='+this.reports_Form.value.to_dt).subscribe(res=>{
       console.log(res);
     })
  }

}
