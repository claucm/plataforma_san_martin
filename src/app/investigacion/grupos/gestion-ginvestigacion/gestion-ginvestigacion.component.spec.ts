import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGinvestigacionComponent } from './gestion-ginvestigacion.component';

describe('GestionGinvestigacionComponent', () => {
  let component: GestionGinvestigacionComponent;
  let fixture: ComponentFixture<GestionGinvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionGinvestigacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionGinvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
