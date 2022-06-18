import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotenEditorComponent } from './noten-editor.component';

describe('NotenEditorComponent', () => {
  let component: NotenEditorComponent;
  let fixture: ComponentFixture<NotenEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotenEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotenEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
