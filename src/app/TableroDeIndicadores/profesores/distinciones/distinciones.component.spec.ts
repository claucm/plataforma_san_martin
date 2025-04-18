import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistincionesComponent } from './distinciones.component';

describe('DistincionesComponent', () => {
  let component: DistincionesComponent;
  let fixture: ComponentFixture<DistincionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistincionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistincionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
