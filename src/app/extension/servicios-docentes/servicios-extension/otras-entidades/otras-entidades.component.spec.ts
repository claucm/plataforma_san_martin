import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrasEntidadesComponent } from './otras-entidades.component';

describe('OtrasEntidadesComponent', () => {
  let component: OtrasEntidadesComponent;
  let fixture: ComponentFixture<OtrasEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrasEntidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrasEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
