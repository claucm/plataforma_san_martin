import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaResumenComponent } from './ficha-resumen.component';

describe('FichaResumenComponent', () => {
  let component: FichaResumenComponent;
  let fixture: ComponentFixture<FichaResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaResumenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
