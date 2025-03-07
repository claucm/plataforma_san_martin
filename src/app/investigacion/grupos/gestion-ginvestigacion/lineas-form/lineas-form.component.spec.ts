import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineasFormComponent } from './lineas-form.component';

describe('LineasFormComponent', () => {
  let component: LineasFormComponent;
  let fixture: ComponentFixture<LineasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
