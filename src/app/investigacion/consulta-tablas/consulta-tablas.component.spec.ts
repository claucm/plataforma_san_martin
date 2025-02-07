import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTablasComponent } from './consulta-tablas.component';

describe('ConsultaTablasComponent', () => {
  let component: ConsultaTablasComponent;
  let fixture: ComponentFixture<ConsultaTablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTablasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
