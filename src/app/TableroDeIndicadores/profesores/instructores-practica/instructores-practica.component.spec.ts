import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstructoresPracticaComponent } from './instructores-practica.component';
import { FormsModule } from '@angular/forms';

describe('InstructoresPracticaComponent', () => {
  let component: InstructoresPracticaComponent;
  let fixture: ComponentFixture<InstructoresPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, InstructoresPracticaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructoresPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.selectedPeriodo).toBe('2024-1');
    expect(component.selectedPrograma).toBe('');
    expect(component.selectedArea).toBe('');
    expect(component.selectedHospital).toBe('');
  });

  it('should return correct estado class', () => {
    expect(component.getEstadoClass('Activo')).toBe('bg-success');
    expect(component.getEstadoClass('Inactivo')).toBe('bg-danger');
    expect(component.getEstadoClass('Licencia')).toBe('bg-warning');
  });
});
