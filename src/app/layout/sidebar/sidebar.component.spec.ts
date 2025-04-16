import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    const initialMode = component.isDarkMode;
    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(!initialMode);
  });

  it('should toggle menu expansion', () => {
    const menuId = 'testMenu';
    component.toggleMenu(menuId);
    expect(component.isMenuExpanded(menuId)).toBe(true);
  });

  it('should check route activity', () => {
    const testRoute = '/dashboard';
    expect(component.isRouteActive(testRoute)).toBeDefined();
  });
});
