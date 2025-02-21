import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticasPasantiasComponent } from './practicas-pasantias.component';

describe('PracticasPasantiasComponent', () => {
  let component: PracticasPasantiasComponent;
  let fixture: ComponentFixture<PracticasPasantiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticasPasantiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticasPasantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
