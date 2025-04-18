import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DistribucionDemograficaComponent } from './distribucion-demografica.component';
import { FormsModule } from '@angular/forms';

describe('DistribucionDemograficaComponent', () => {
  let component: DistribucionDemograficaComponent;
  let fixture: ComponentFixture<DistribucionDemograficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, DistribucionDemograficaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DistribucionDemograficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.selectedPeriodo).toBe('2024-1');
    expect(component.selectedFacultad).toBe('');
    expect(component.selectedGenero).toBe('');
    expect(component.selectedRangoEdad).toBe('');
  });

  it('should have correct demographic indicators', () => {
    expect(component.edadPromedio).toBe(45);
    expect(component.porcentajeMujeres).toBe(42);
    expect(component.mayorGrupoEdad).toBe('36-45');
    expect(component.antiguedadMedia).toBe(12);
  });
});
