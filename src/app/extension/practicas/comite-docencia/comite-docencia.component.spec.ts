import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComiteDocenciaComponent } from './comite-docencia.component';

describe('ComiteDocenciaComponent', () => {
  let component: ComiteDocenciaComponent;
  let fixture: ComponentFixture<ComiteDocenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComiteDocenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComiteDocenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
