import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaConvocatoriaComponent } from './apertura-convocatoria.component';

describe('AperturaConvocatoriaComponent', () => {
  let component: AperturaConvocatoriaComponent;
  let fixture: ComponentFixture<AperturaConvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AperturaConvocatoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AperturaConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
