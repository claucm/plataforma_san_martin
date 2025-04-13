import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosDeExtensionComponent } from './servicios-de-extension.component';

describe('ServiciosDeExtensionComponent', () => {
  let component: ServiciosDeExtensionComponent;
  let fixture: ComponentFixture<ServiciosDeExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosDeExtensionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosDeExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
