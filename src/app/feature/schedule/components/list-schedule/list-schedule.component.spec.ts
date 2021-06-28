import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListScheduleComponent } from './list-schedule.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ScheduleService } from '../../shared/service/schedule.service';
import { Schedule } from '../../shared/model/schedule';
import { HttpService } from 'src/app/core/services/http.service';

describe('ListScheduleComponent', () => {
  let component: ListScheduleComponent;
  let fixture: ComponentFixture<ListScheduleComponent>;
  let scheduleService: ScheduleService;
  const listSchedule: Schedule[] = [
    new Schedule(
      2021542128342,
      'cita de prueba 23421',
      'nombre prueba 2',
      '2021-06-24T05:00:00.000Z',
      '15:00',
      '16:00',
      '40'
    ), 
    new Schedule(
      20215421283455,
      'cita de prueba 32423',
      'nombre prueba 243223',
      '2021-06-24T05:00:00.000Z',
      '15:00',
      '16:00',
      '40'
    )
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListScheduleComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [ScheduleService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScheduleComponent);
    component = fixture.componentInstance;
    scheduleService = TestBed.inject(ScheduleService);
    spyOn(scheduleService, 'get').and.returnValue(
      of(listSchedule)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listSchedule.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
