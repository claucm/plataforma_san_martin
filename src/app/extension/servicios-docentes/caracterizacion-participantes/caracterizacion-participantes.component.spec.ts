import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracterizacionParticipantesComponent } from './caracterizacion-participantes.component';

describe('CaracterizacionParticipantesComponent', () => {
  let component: CaracterizacionParticipantesComponent;
  let fixture: ComponentFixture<CaracterizacionParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaracterizacionParticipantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaracterizacionParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
