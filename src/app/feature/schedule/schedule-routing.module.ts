import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateScheduleComponent } from './components/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './components/edit-schedule/edit-schedule.component';
import { ListScheduleComponent } from './components/list-schedule/list-schedule.component';


const routes: Routes = [
  {
    path: '',
    component: ListScheduleComponent,
    children: [
      {
        path: 'create',
        component: CreateScheduleComponent
      },
      {
        path: 'edit',
        component: EditScheduleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
