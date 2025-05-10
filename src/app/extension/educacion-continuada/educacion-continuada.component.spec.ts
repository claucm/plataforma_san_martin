import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacionContinuadaComponent } from './educacion-continuada.component';

describe('EducacionContinuadaComponent', () => {
  let component: EducacionContinuadaComponent;
  let fixture: ComponentFixture<EducacionContinuadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducacionContinuadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducacionContinuadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
