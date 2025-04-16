import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramasInactivosComponent } from './programas-inactivos.component';
import { FormsModule } from '@angular/forms';

describe('ProgramasInactivosComponent', () => {
  let component: ProgramasInactivosComponent;
  let fixture: ComponentFixture<ProgramasInactivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramasInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component['selectedSede']).toBe('');
    expect(component['selectedFacultad']).toBe('');
    expect(component['selectedNivel']).toBe('');
    expect(component['selectedYear']).toBe('');
  });

  it('should return correct estado class', () => {
    expect(component['getEstadoClass']('Inactivo')).toBe('bg-danger');
    expect(component['getEstadoClass']('En Proceso')).toBe('bg-warning');
    expect(component['getEstadoClass']('Reactivado')).toBe('bg-success');
  });
});
