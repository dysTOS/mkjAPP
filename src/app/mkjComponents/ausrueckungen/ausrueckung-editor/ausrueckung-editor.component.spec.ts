import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusrueckungEditorComponent } from './ausrueckung-editor.component';

describe('AusrueckungEditorComponent', () => {
  let component: AusrueckungEditorComponent;
  let fixture: ComponentFixture<AusrueckungEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AusrueckungEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AusrueckungEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
