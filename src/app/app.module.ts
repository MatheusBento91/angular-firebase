import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { LoginComponent } from './login/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth/auth.service';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ToastrModule } from 'ngx-toastr';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ThemeService } from './services/theme/theme.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';

import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from "@angular/common";
registerLocaleData(localePt);

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      easeTime: 600,
      progressBar: true,
      closeButton: true,
      progressAnimation: 'decreasing',
    }),
    SharedModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    NgChartsModule,
  ],
  providers: [
    AuthService,
    ThemeService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
