import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PorCreditosComponent } from './por-creditos.component';
import { FormsModule } from '@angular/forms';

describe('PorCreditosComponent', () => {
  let component: PorCreditosComponent;
  let fixture: ComponentFixture<PorCreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(PorCreditosComponent);
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

  it('should filter students based on selections', () => {
    component['selectedSede'] = 'Bogotá';
    expect(component['filteredEstudiantes'].every(e => e.sede === 'Bogotá')).toBeTruthy();
  });
});
