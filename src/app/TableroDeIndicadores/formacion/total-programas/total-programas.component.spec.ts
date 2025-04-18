import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalProgramasComponent } from './total-programas.component';
import { FormsModule } from '@angular/forms';

describe('TotalProgramasComponent', () => {
  let component: TotalProgramasComponent;
  let fixture: ComponentFixture<TotalProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(TotalProgramasComponent);
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
    expect(component['selectedYear']).toBe('2024');
  });

  it('should return correct estado class', () => {
    expect(component['getEstadoClass']('Activo')).toBe('bg-success');
    expect(component['getEstadoClass']('Inactivo')).toBe('bg-danger');
  });
});
