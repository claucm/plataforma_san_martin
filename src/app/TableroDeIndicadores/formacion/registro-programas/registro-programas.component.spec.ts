import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroProgramasComponent } from './registro-programas.component';
import { FormsModule } from '@angular/forms';

describe('RegistroProgramasComponent', () => {
  let component: RegistroProgramasComponent;
  let fixture: ComponentFixture<RegistroProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component['selectedPeriodo']).toBe('2024-1');
    expect(component['selectedFacultad']).toBe('');
    expect(component['selectedNivel']).toBe('');
    expect(component['selectedEstado']).toBe('');
  });

  it('should return correct estado class', () => {
    expect(component['getEstadoClass']('Registrado')).toBe('bg-success');
    expect(component['getEstadoClass']('Pendiente')).toBe('bg-warning');
    expect(component['getEstadoClass']('Rechazado')).toBe('bg-danger');
  });
});
