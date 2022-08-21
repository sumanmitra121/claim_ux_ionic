import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,],
  providers: [Printer,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },DatePipe],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule {}
