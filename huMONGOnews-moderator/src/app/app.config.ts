import { FeatherModule } from 'angular-feather';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { BarChart2, Search, Menu } from 'angular-feather/icons';

const icons = {
  BarChart2,
  Search,
  Menu,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    importProvidersFrom(FeatherModule.pick(icons)),
  ],
};
