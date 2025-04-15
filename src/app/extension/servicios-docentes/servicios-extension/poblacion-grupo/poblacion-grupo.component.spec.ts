import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoblacionGrupoComponent } from './poblacion-grupo.component';

describe('PoblacionGrupoComponent', () => {
  let component: PoblacionGrupoComponent;
  let fixture: ComponentFixture<PoblacionGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoblacionGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoblacionGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
