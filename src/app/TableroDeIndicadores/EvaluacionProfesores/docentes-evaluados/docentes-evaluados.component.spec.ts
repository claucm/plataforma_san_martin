import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocentesEvaluadosComponent } from './docentes-evaluados.component';
import { FormsModule } from '@angular/forms';

describe('DocentesEvaluadosComponent', () => {
  let component: DocentesEvaluadosComponent;
  let fixture: ComponentFixture<DocentesEvaluadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(DocentesEvaluadosComponent);
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
    component['selectedSede'] = 'Bogotá';
    expect(component['filteredDocentes'].every(d => d.sede === 'Bogotá')).toBeTruthy();
  });
});