/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  title: any;
  reports: any[];
  _total: number= 0;
  constructor(
    public printer: Printer,
    public route: ActivatedRoute,
    private api_call: ApiCallService) {
    this.title=this.route.snapshot.params.type === 'C' ? 'Claim Reports' : 'Reports';
    console.log(this.route.snapshot.params.frm_dt);
    console.log(this.route.snapshot.params.to_dt);
    console.log(this.route.snapshot.params.type);
  }

  ngOnInit() {
    this.populateTable();
  }
  populateTable(){
    this.api_call.getData('/claim_details?emp_no='+ JSON.parse(localStorage.getItem('user')).emp_no + '&flag=1&from_dt='+this.route.snapshot.params.frm_dt+'&to_dt='+this.route.snapshot.params.to_dt).subscribe(res =>{
      this.reports = JSON.parse(res.data).msg;
      this.reports.forEach(element =>{
        this._total = this._total + Number(element.amount);
      });
    });
  }

  print(){
    this.printer.isAvailable().then((onSuccess: any) => {
      const content = document.getElementById('printTable').innerHTML;
      const options: PrintOptions = {
      name: 'ClaimDetails',
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
