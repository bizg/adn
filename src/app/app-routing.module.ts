import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { AdminLayoutComponent } from '@core/layouts/admin/admin.layout.component';
import { AuthLayoutComponent } from '@core/layouts/auth/auth.layout.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [SecurityGuard],
        children: [
            { path: 'schedule', loadChildren: () => import('@schedule/schedule.module').then(mod => mod.ScheduleModule) },
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', loadChildren: () => import('./feature/login/login.module').then(mod => mod.LoginModule) },
        ]
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
