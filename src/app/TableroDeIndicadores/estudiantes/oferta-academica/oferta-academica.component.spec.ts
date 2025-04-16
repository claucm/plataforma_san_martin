import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertaAcademicaComponent } from './oferta-academica.component';
import { FormsModule } from '@angular/forms';

describe('OfertaAcademicaComponent', () => {
  let component: OfertaAcademicaComponent;
  let fixture: ComponentFixture<OfertaAcademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(OfertaAcademicaComponent);
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

  it('should filter programs based on selections', () => {
    component['selectedSede'] = 'Bogotá';
    expect(component['filteredProgramas'].every(p => p.sede === 'Bogotá')).toBeTruthy();
  });
});