import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhLYVJ2WmFZfVpgdV9CYFZTTGY/P1ZhSXxXdkdjWn5ddHRXTmZbWE0= '
);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
