import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadNacionalComponent } from './entidad-nacional.component';

describe('EntidadNacionalComponent', () => {
  let component: EntidadNacionalComponent;
  let fixture: ComponentFixture<EntidadNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadNacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
