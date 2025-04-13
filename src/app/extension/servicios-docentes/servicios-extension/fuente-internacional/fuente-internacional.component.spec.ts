import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuenteInternacionalComponent } from './fuente-internacional.component';

describe('FuenteInternacionalComponent', () => {
  let component: FuenteInternacionalComponent;
  let fixture: ComponentFixture<FuenteInternacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuenteInternacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuenteInternacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
