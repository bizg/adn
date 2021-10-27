import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth.LayoutComponent } from './auth.layout.component';

describe('Auth.LayoutComponent', () => {
  let component: Auth.LayoutComponent;
  let fixture: ComponentFixture<Auth.LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth.LayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth.LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
