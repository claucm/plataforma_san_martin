import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloVitalComponent } from './ciclo-vital.component';

describe('CicloVitalComponent', () => {
  let component: CicloVitalComponent;
  let fixture: ComponentFixture<CicloVitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CicloVitalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CicloVitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
