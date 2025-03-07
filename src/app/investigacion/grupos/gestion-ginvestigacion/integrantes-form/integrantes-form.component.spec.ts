import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrantesFormComponent } from './integrantes-form.component';

describe('IntegrantesFormComponent', () => {
  let component: IntegrantesFormComponent;
  let fixture: ComponentFixture<IntegrantesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrantesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrantesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
