import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricosComponent } from './historicos.component';
import { FormsModule } from '@angular/forms';

describe('HistoricosComponent', () => {
  let component: HistoricosComponent;
  let fixture: ComponentFixture<HistoricosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component['selectedYear']).toBe('2024');
    expect(component['selectedPeriodo']).toBe('1');
    expect(component['selectedSede']).toBe('');
    expect(component['selectedFacultad']).toBe('');
    expect(component['selectedPrograma']).toBe('');
  });

  it('should filter registros correctly', () => {
    component['selectedFacultad'] = 'Medicina';
    expect(component['filteredRegistros'].every(r => r.facultad === 'Medicina')).toBeTruthy();
  });
});
