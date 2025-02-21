import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticasProfesionalesComponent } from './practicas-profesionales.component';

describe('PracticasProfesionalesComponent', () => {
  let component: PracticasProfesionalesComponent;
  let fixture: ComponentFixture<PracticasProfesionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticasProfesionalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticasProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
