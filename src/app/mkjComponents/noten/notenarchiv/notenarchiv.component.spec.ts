import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotenarchivComponent } from './notenarchiv.component';

describe('NotenarchivComponent', () => {
  let component: NotenarchivComponent;
  let fixture: ComponentFixture<NotenarchivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotenarchivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotenarchivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
