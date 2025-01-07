import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProyectoComponent } from './registro-proyecto.component';

describe('RegistroProyectoComponent', () => {
  let component: RegistroProyectoComponent;
  let fixture: ComponentFixture<RegistroProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
