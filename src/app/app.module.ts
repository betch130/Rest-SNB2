import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TokenInterceptorService } from 'src/Services/token-interceptor.service';
import { ErrorInterceptorService } from 'src/Services/error-interceptor.service';
import { LoginPage } from './Authentification/login/login.page';
import { GlobalService } from 'src/Services/global.service';
import { NbActionsModule, NbContextMenuDirective, NbContextMenuModule, NbIconModule, NbLayoutHeaderComponent, NbLayoutModule, NbMenuModule, NbMenuService, NbSearchModule, NbSidebarModule, NbSidebarService, NbThemeModule, NbToastrModule, NbToastrService, NbUserModule, NbWindowModule, NbWindowService } from '@nebular/theme';
import { HeaderComponent } from './Layout/header/header.component';
import { HeaderContenuComponent } from './Layout/header-contenu/header-contenu.component';
import { LoggedAuthGuard } from 'src/Services/logged-auth-guard.service';
import { NotLoggedAuthGuard } from 'src/Services/not-logged-auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HeaderContenuComponent],
  entryComponents: [HeaderComponent, HeaderContenuComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),
    FormsModule,
    BrowserAnimationsModule,
    NbIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbLayoutModule,
    NbSidebarModule,
    NbActionsModule,
    NbUserModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule,
    NbContextMenuModule,
    NbSearchModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    DatePipe,
    GlobalService,
    NbSidebarService,
    LoggedAuthGuard,
    NotLoggedAuthGuard,
    NbMenuService,
    NbWindowService,
    NbToastrService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }, {
      provide: LOCALE_ID,
      useValue: 'fr-FR'

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
