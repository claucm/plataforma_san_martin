import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DistribucionDocentesComponent } from './distribucion-docentes.component';
import { FormsModule } from '@angular/forms';

describe('DistribucionDocentesComponent', () => {
  let component: DistribucionDocentesComponent;
  let fixture: ComponentFixture<DistribucionDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, DistribucionDocentesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DistribucionDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.selectedPeriodo).toBe('2024-1');
    expect(component.selectedFacultad).toBe('');
    expect(component.selectedDepartamento).toBe('');
    expect(component.selectedCategoria).toBe('');
  });

  it('should filter distribution data correctly', () => {
    component.selectedFacultad = 'Medicina';
    const filtered = component.filteredDistribucion;
    expect(filtered.every(item => item.facultad === 'Medicina')).toBeTruthy();
  });
});
