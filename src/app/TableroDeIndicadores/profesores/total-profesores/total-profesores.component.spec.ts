import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalProfesoresComponent } from './total-profesores.component';
import { FormsModule } from '@angular/forms';

describe('TotalProfesoresComponent', () => {
  let component: TotalProfesoresComponent;
  let fixture: ComponentFixture<TotalProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TotalProfesoresComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TotalProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.selectedPeriodo).toBe('2024-1');
    expect(component.selectedFacultad).toBe('');
    expect(component.selectedTipo).toBe('');
    expect(component.selectedNivel).toBe('');
  });

  it('should return correct estado class', () => {
    expect(component.getEstadoClass('Activo')).toBe('bg-success');
    expect(component.getEstadoClass('Inactivo')).toBe('bg-danger');
    expect(component.getEstadoClass('Licencia')).toBe('bg-warning');
  });
});
