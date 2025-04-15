import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoblacionCondicionComponent } from './poblacion-condicion.component';

describe('PoblacionCondicionComponent', () => {
  let component: PoblacionCondicionComponent;
  let fixture: ComponentFixture<PoblacionCondicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoblacionCondicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoblacionCondicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
