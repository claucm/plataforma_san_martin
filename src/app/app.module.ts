import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

// Import models to ensure TypeScript recognizes them
import './models/budget-execution.model';
import './models/budget-status.model';
import './models/budget.model';
import './models/campus.model';
import './models/cost-center.model';
import './models/extension-beneficiary.model';
import './models/faculty.model';
import './models/functionality.model';
import './models/information-system.model';
import './models/knowledge-areas.model';
import './models/module.model';
import './models/permission.model';
import './models/program.model';
import './models/project-product.model';
import './models/project-status.model';
import './models/project-type.model';
import './models/project.model';
import './models/research-group.model';
import './models/research-seedbed.model';
import './models/role.model';
import './models/submodule.model';
import './models/user.model';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
