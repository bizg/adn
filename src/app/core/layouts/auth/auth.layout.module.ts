import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth.layout-routing.module';
import { AuthLayoutComponent } from './auth.layout.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AuthLayoutRoutingModule
  ]
})
export class AuthLayoutModule { }
