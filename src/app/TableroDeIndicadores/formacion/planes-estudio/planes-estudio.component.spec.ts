import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesEstudioComponent } from './planes-estudio.component';
import { FormsModule } from '@angular/forms';

describe('PlanesEstudioComponent', () => {
  let component: PlanesEstudioComponent;
  let fixture: ComponentFixture<PlanesEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(PlanesEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component['selectedFacultad']).toBe('');
    expect(component['selectedPrograma']).toBe('');
    expect(component['selectedNivel']).toBe('');
    expect(component['selectedEstado']).toBe('');
  });

  it('should return correct estado class', () => {
    expect(component['getEstadoClass']('Activo')).toBe('bg-success');
    expect(component['getEstadoClass']('En Revisión')).toBe('bg-warning');
    expect(component['getEstadoClass']('Inactivo')).toBe('bg-danger');
  });
});
