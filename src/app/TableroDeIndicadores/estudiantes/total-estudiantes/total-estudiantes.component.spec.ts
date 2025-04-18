import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalEstudiantesComponent } from './total-estudiantes.component';
import { FormsModule } from '@angular/forms';

describe('TotalEstudiantesComponent', () => {
  let component: TotalEstudiantesComponent;
  let fixture: ComponentFixture<TotalEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(TotalEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default period', () => {
    expect(component['selectedPeriodo']).toBe('2024-1');
  });

  it('should calculate total students correctly', () => {
    expect(component['totalEstudiantes']).toBeGreaterThan(0);
  });
});
