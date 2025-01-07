import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActasInicioComponent } from './actas-inicio.component';

describe('ActasInicioComponent', () => {
  let component: ActasInicioComponent;
  let fixture: ComponentFixture<ActasInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActasInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActasInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
