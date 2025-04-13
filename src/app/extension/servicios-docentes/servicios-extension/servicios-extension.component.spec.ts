import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosExtensionComponent } from './servicios-extension.component';

describe('ServiciosExtensionComponent', () => {
  let component: ServiciosExtensionComponent;
  let fixture: ComponentFixture<ServiciosExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosExtensionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
