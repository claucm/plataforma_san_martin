import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PremedicoComponent } from './premedico.component';
import { FormsModule } from '@angular/forms';

describe('PremedicoComponent', () => {
  let component: PremedicoComponent;
  let fixture: ComponentFixture<PremedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(PremedicoComponent);
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

  it('should calculate total students correctly', () => {
    expect(component['totalEstudiantes']).toBeGreaterThan(0);
  });
});
