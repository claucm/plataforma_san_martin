import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspecializacionesMedicasComponent } from './especializaciones-medicas.component';
import { FormsModule } from '@angular/forms';

describe('EspecializacionesMedicasComponent', () => {
  let component: EspecializacionesMedicasComponent;
  let fixture: ComponentFixture<EspecializacionesMedicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(EspecializacionesMedicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component['selectedSede']).toBe('');
    expect(component['selectedArea']).toBe('');
    expect(component['selectedDuracion']).toBe('');
    expect(component['selectedEstado']).toBe('');
  });

  it('should return correct estado class', () => {
    expect(component['getEstadoClass']('Activo')).toBe('bg-success');
    expect(component['getEstadoClass']('En Proceso')).toBe('bg-warning');
    expect(component['getEstadoClass']('Inactivo')).toBe('bg-danger');
  });
});
