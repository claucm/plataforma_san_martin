import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecasComponent } from './becas.component';

describe('BecasComponent', () => {
  let component: BecasComponent;
  let fixture: ComponentFixture<BecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
