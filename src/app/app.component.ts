import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  idUser : String;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage : Storage) {
    this.storage.get('idUser').then((val) => {
      console.log('Your id is', val);
      this.idUser = val;
      if (this.idUser!= null) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    });


    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
