import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungsGeneratorComponent } from './rechnungs-generator.component';

describe('RechnungsGeneratorComponent', () => {
  let component: RechnungsGeneratorComponent;
  let fixture: ComponentFixture<RechnungsGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechnungsGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungsGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
