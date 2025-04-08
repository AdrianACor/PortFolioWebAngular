import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { routes } from './app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


const loadTranslateJson: (http: HttpClient)  =>  TranslateHttpLoader = (http: HttpClient)=>
  new TranslateHttpLoader(http, '../assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: ()=> loadTranslateJson,
        deps:[HttpClient]
      }
    }),
  ]
};
