import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitgliedEditorComponent } from './mitglied-editor.component';

describe('MitgliedEditorComponent', () => {
  let component: MitgliedEditorComponent;
  let fixture: ComponentFixture<MitgliedEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitgliedEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MitgliedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
