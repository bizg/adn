import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CreateScheduleComponent } from './create-schedule.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ScheduleService } from '../../shared/service/schedule.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('CreateScheduleComponent', () => {
  let component: CreateScheduleComponent;
  let fixture: ComponentFixture<CreateScheduleComponent>;
  let scheduleService: ScheduleService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateScheduleComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [ScheduleService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScheduleComponent);
    component = fixture.componentInstance;
    scheduleService = TestBed.inject(ScheduleService);
    spyOn(scheduleService, 'create').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.scheduleForm.valid).toBeFalsy();
  });

  it('Registrando producto', () => {
    expect(component.scheduleForm.valid).toBeFalsy();
    component.scheduleForm.controls.id.setValue('001');
    component.scheduleForm.controls.descripcion.setValue('Producto test');
    expect(component.scheduleForm.valid).toBeTruthy();

    component.save();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });
});
