/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'Component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: any;
  constructor(private api_call: ApiCallService) { }

  ngOnInit() {}

}
