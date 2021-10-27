import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin.layout-routing.module';
import { AdminLayoutComponent } from './admin.layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarComponent } from '@core/components/toolbar/toolbar.component';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
    declarations: [
        AdminLayoutComponent,
        ToolbarComponent,
        NavbarComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AdminLayoutRoutingModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule
    ],
    exports: [ToolbarComponent, NavbarComponent],
})
export class AdminLayoutModule { }
