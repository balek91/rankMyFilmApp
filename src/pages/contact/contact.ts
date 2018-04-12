import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  error: String;
  returnOk: String;
  token: string;

  constructor(public navCtrl: NavController, public http: Http, private storage: Storage) {

  }
  testToken() {
    this.storage.get('tokenGenerate').then((val) => {
      this.token = val;
      var headers = new Headers();
      headers.append("Authorization", 'Bearer ' + this.token);
      let options = new RequestOptions({ headers: headers });
      this.http.get("https://rankmyfilmcore.azurewebsites.net/api/rank/nbFilm", options)
        .subscribe(data => {
          if (JSON.parse(data['_body']) != null) {
            this.returnOk = JSON.parse(data['_body']);
          }
          else {
            this.error = "Not Authorize";
          }
        }, error => {
          this.error = error;
        });
    });
  }
}
