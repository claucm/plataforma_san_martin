import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosTabFormComponent } from './productos-tab-form.component';

describe('ProductosTabFormComponent', () => {
  let component: ProductosTabFormComponent;
  let fixture: ComponentFixture<ProductosTabFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosTabFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosTabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
