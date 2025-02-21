import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveniosDocenciaComponent } from './convenios-docencia.component';

describe('ConveniosDocenciaComponent', () => {
  let component: ConveniosDocenciaComponent;
  let fixture: ComponentFixture<ConveniosDocenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConveniosDocenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveniosDocenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
