/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'component-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss'],
})
export class RefreshComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  doRefresh(event){
    setTimeout(()=>{
      event.target.complete();
      location.reload();
    },3000);
  }
}
