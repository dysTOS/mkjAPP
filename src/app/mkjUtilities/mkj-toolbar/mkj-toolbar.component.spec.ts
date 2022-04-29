import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MkjToolbarComponent } from './mkj-toolbar.component';

describe('MkjToolbarComponent', () => {
  let component: MkjToolbarComponent;
  let fixture: ComponentFixture<MkjToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MkjToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MkjToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
