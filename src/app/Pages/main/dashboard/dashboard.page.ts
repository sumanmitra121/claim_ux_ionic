import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  title: any='Dashboard';
  features: any[] = [
    {id: 1, name: 'Claims', src: 'assets/Image/claim_dashboard.jpg', background: 'rgba(27,150,181, 0.1)', page: '/main/claim_dashboard'},
    {id: 2, name: 'Add Claim', src: 'assets/Image/add_claim.webp', background: 'rgba(106,100,255, 0.1)', page: '/main/add_claim/0'},
    {id: 3, name: 'PaySheet', src: 'assets/Image/download_paysheet.png', background: 'rgba(255, 196, 9, 0.1)', page: ''},
    {id: 4, name: 'Reports', src: 'assets/Image/reports.webp', background: 'rgba(27,150,181, 0.1)', page: ''},
  ];
  transactions: any[] = [
    {id: 1, vendor: 'Last Recievable Amount', image: '', amount: 1500, date: '26/08/2022 22:05'},
    {id: 2, vendor: 'Last Claim Amount', image: '', amount: -1200, date: '26/08/2022 22:05'}
  ];
  constructor() { }

  ngOnInit() {
  }
}
