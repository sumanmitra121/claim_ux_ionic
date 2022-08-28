import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-auth',
  templateUrl: './main-auth.component.html',
  styleUrls: ['./main-auth.component.scss'],
})
export class MainAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
      location.reload();
    }, 3000);
  }
}
