import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PorProgramaComponent } from './por-programa.component';
import { FormsModule } from '@angular/forms';

describe('PorProgramaComponent', () => {
  let component: PorProgramaComponent;
  let fixture: ComponentFixture<PorProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(PorProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component['selectedNivel']).toBe('');
    expect(component['selectedFacultad']).toBe('');
    expect(component['selectedSede']).toBe('');
    expect(component['selectedPeriodo']).toBe('2024-1');
  });

  it('should calculate total students correctly', () => {
    expect(component['totalEstudiantes']).toBeGreaterThan(0);
  });
});
