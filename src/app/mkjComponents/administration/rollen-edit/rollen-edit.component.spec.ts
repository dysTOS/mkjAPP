import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollenEditComponent } from './rollen-edit.component';

describe('RollenEditComponent', () => {
  let component: RollenEditComponent;
  let fixture: ComponentFixture<RollenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollenEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
