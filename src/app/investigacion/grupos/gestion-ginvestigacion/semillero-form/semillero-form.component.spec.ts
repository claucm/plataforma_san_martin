import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemilleroFormComponent } from './semillero-form.component';

describe('SemilleroFormComponent', () => {
  let component: SemilleroFormComponent;
  let fixture: ComponentFixture<SemilleroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemilleroFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemilleroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
