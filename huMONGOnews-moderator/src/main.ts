import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhKYVJ0WmFZfVpgcV9CZlZQQGYuP1ZhSXxXdkdiWH9bdHJUQ2NeU0Y='
);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
