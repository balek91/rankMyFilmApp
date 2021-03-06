import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CreatePage } from '../create/create';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';

declare const window: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;
  private logOk: boolean = false;
  loading;

  constructor(public navCtrl: NavController, private storage: Storage, public http: Http, public loadingCtrl: LoadingController) {

  }

  cleanStorage() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }
  createAccount() {
    this.navCtrl.push(CreatePage);
  }
  login(): void {
    this.postRequest(this.username, this.password);
  }
  postRequest(username, password) {
    this.loading = this.loadingCtrl.create({});
    this.loading.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let postParams = {
      userEmail: username,
      userPassword: password
    }
    this.http.post("http://rankmyfilmcore.azurewebsites.net/api/user/login", postParams, options)
      .subscribe(data => {
        if (JSON.parse(data['_body']).idUser != null) {
          this.storage.set('idUser', JSON.parse(data['_body']).idUser);
          this.storage.set('tokenGenerate', JSON.parse(data['_body']).tokenGenerate);
          this.navCtrl.push(TabsPage);
        }
        else {
          this.error = "User ou Password incorrect";
        }
        this.loading.dismiss();
      }, error => {
        this.error = error;
        this.loading.dismiss();
      });
  }
}
