import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DedicacionDocentesComponent } from './dedicacion-docentes.component';

describe('DedicacionDocentesComponent', () => {
  let component: DedicacionDocentesComponent;
  let fixture: ComponentFixture<DedicacionDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DedicacionDocentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DedicacionDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
