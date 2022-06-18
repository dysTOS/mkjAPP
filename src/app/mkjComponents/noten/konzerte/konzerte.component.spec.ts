import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonzerteComponent } from './konzerte.component';

describe('KonzerteComponent', () => {
  let component: KonzerteComponent;
  let fixture: ComponentFixture<KonzerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonzerteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonzerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
