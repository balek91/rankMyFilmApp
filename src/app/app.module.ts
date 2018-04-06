import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountPage } from '../pages/account/account';
import { SearchPage } from '../pages/search/search';
import { MovieDetailPage } from "../pages/movie-detail/movie-detail";
import { UserDetailPage } from "../pages/user-detail/user-detail";
import { CreatePage } from "../pages/create/create";
import { UserDetailMoviesPage } from "../pages/user-detail-movies/user-detail-movies";
import { LoginPageModule } from '../pages/login/login.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import{ HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    AccountPage,
    SearchPage,
    MovieDetailPage,
    UserDetailPage,
    CreatePage,
    UserDetailMoviesPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginPageModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TabsPage,
    AccountPage,
    SearchPage,
    MovieDetailPage,
    UserDetailPage,
    CreatePage,
    UserDetailMoviesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
