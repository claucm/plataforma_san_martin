import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramasModalidadComponent } from './programas-modalidad.component';
import { FormsModule } from '@angular/forms';

describe('ProgramasModalidadComponent', () => {
  let component: ProgramasModalidadComponent;
  let fixture: ComponentFixture<ProgramasModalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramasModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component['selectedModalidad']).toBe('');
    expect(component['selectedNivel']).toBe('');
    expect(component['selectedFacultad']).toBe('');
    expect(component['selectedEstado']).toBe('');
  });

  it('should return correct estado class', () => {
    expect(component['getEstadoClass']('Activo')).toBe('bg-success');
    expect(component['getEstadoClass']('En Desarrollo')).toBe('bg-warning');
    expect(component['getEstadoClass']('Inactivo')).toBe('bg-danger');
  });
});
