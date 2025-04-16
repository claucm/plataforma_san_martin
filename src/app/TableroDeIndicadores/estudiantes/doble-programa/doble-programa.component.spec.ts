import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobleProgramaComponent } from './doble-programa.component';

describe('DobleProgramaComponent', () => {
  let component: DobleProgramaComponent;
  let fixture: ComponentFixture<DobleProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DobleProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DobleProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
