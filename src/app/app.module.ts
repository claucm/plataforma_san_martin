import { importProvidersFrom, NgModule } from '@angular/core';
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

import { routes } from './app.routes';

import { InvestigacionModule } from './investigacion/investigacion.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    InvestigacionModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: []
})
export class AppModule { }

export function bootstrap() {
  throw new Error('bootstrapApplication is not available. Please use traditional Angular bootstrap method.');
}
