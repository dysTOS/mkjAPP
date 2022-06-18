import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitgliedPersonalEditComponent } from './mitglied-personal-edit.component';

describe('MitgliedPersonalEditComponent', () => {
  let component: MitgliedPersonalEditComponent;
  let fixture: ComponentFixture<MitgliedPersonalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitgliedPersonalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MitgliedPersonalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
