import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertaAcademicaComponent } from './oferta-academica.component';

describe('OfertaAcademicaComponent', () => {
  let component: OfertaAcademicaComponent;
  let fixture: ComponentFixture<OfertaAcademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertaAcademicaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OfertaAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct values', () => {
    expect(component.totalProgramas).toBe(65);
    expect(component.programasPregrado).toBe(30);
    expect(component.programasPosgrado).toBe(35);
    expect(component.programasNuevos).toBe(5);
  });

  it('should return correct estado class', () => {
    expect(component.getEstadoClass('Activo')).toBe('bg-success');
    expect(component.getEstadoClass('Inactivo')).toBe('bg-danger');
    expect(component.getEstadoClass('Pendiente')).toBe('bg-warning');
  });
});
