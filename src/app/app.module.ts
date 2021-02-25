import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { AppStoreModule } from './store/app-store.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ar_EG, NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';

registerLocaleData(en);
// registerLocaleData(ar);

@NgModule({
  declarations: [AppComponent],
  imports: [
    ReactiveFormsModule,
    TodosModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NgZorroAntdModule,
    AppStoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: NZ_I18N,
      useValue: en_US,
      //   // useFactory: (localId: string) => {
      //   //   switch (localId) {
      //   //     case 'en':
      //   //       return en_US;
      //   //     /** keep the same with angular.json/i18n/locales configuration **/
      //   //     case 'ar':
      //   //       return ar_EG;
      //   //     default:
      //   //       return en_US;
      //   //   }
      //   // },
      //   // deps: [LOCALE_ID],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
