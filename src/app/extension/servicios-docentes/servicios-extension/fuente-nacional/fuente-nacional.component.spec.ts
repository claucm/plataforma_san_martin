import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuenteNacionalComponent } from './fuente-nacional.component';

describe('FuenteNacionalComponent', () => {
  let component: FuenteNacionalComponent;
  let fixture: ComponentFixture<FuenteNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuenteNacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuenteNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
