import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityGuard } from './guard/security.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpService } from './services/http.service';
import { ManejadorError } from './interceptor/manejador-error';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatListModule } from '@angular/material/list';
import { TrmService } from './services/trm.service';

@NgModule({
	declarations: [ToolbarComponent, NavbarComponent],
	imports: [
		CommonModule,
		RouterModule,
		FlexLayoutModule,
		MatToolbarModule,
		MatIconModule,
		MatSidenavModule,
		MatMenuModule,
		MatButtonModule,
		MatDividerModule,
		MatListModule
	],
	exports: [ToolbarComponent, NavbarComponent],
	providers: [
		HttpService,
		TrmService,
		SecurityGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: ErrorHandler, useClass: ManejadorError }
	]
})
export class CoreModule { }
