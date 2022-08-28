/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';

import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'Component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: any;
  constructor(private api_call: ApiCallService,
    private navCtrl: NavController) { }
  ngOnInit() {}
  back(){
    const animations: AnimationOptions={
      animated: true,
      animationDirection: 'back'
    };
    this.navCtrl.back(animations);
    console.log(this.navCtrl);

  }
}
