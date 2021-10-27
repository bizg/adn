import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '@shared/shared.module';
import { CreateScheduleComponent } from './components/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './components/edit-schedule/edit-schedule.component';
import { ListScheduleComponent } from './components/list-schedule/list-schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleService } from './shared/service/schedule.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { ScheduleMockService } from './shared/data/schedule-mock.service';
import { TrackByPipe } from '@shared/pipe/track-by.pipe';
import { FilterPipe } from '@schedule/shared/pipe/filter/filter.pipe';


@NgModule({
  declarations: [
    ListScheduleComponent,
    CreateScheduleComponent,
    EditScheduleComponent,
    FilterPipe
  ],
  imports: [
    ScheduleRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [ScheduleService, DatePipe, TrackByPipe, FilterPipe, ScheduleMockService],
})
export class ScheduleModule { }
