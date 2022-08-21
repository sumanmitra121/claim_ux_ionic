/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  mode: any;
  public menus = menu;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router,private fb: FormBuilder,private api_call: ApiCallService) {
    this.reports_Form = this.fb.group({
      frm_dt:['',Validators.required],
      to_dt:['',Validators.required]
    });
    console.log(this.menus);
   }

  ngOnInit() {}
  setOpen(isOpen: boolean,menu_name: any,_menu: any) {
    this.isModalOpen = isOpen;
    this.selected_menu = menu_name;
    this.mode = _menu.mode;
  }
  submit_reports(){
    this.router.navigate(['/main/reports',this.mode,this.reports_Form.value.frm_dt,this.reports_Form.value.to_dt]);
    this.isModalOpen = !this.isModalOpen;
  }

}
