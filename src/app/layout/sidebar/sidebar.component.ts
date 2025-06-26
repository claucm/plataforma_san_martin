import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModuleSelectionService } from '../../services/module-selection.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isDarkMode: boolean = false;
  showSidebar: boolean = true;
  selectedModule: string | null = null;
  moduleSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private moduleSelectionService: ModuleSelectionService
  ) {}

  ngOnInit() {
    this.moduleSubscription = this.moduleSelectionService.selectedModule$.subscribe(module => {
      this.selectedModule = module;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showSidebar = event.url !== '/login';
    });
  }

  ngOnDestroy() {
    this.moduleSubscription?.unsubscribe();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}
