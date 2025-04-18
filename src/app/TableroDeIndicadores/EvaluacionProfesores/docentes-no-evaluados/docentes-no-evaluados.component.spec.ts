import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocentesNoEvaluadosComponent } from './docentes-no-evaluados.component';
import { FormsModule } from '@angular/forms';

describe('DocentesNoEvaluadosComponent', () => {
  let component: DocentesNoEvaluadosComponent;
  let fixture: ComponentFixture<DocentesNoEvaluadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(DocentesNoEvaluadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component['selectedSede']).toBe('');
    expect(component['selectedFacultad']).toBe('');
    expect(component['selectedPrograma']).toBe('');
    expect(component['selectedPeriodo']).toBe('2024-1');
  });

  it('should filter docentes correctly', () => {
    component['selectedFacultad'] = 'Ingeniería';
    expect(component['filteredDocentes'].every(d => d.facultad === 'Ingeniería')).toBeTruthy();
  });
});
