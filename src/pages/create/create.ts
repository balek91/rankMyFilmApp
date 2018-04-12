import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  private email: string;
  private pseudo: string;
  private password: string;
  private passwordConfirm: string;
  private error: string;
  private passwordStrong: boolean = false;
  private passwordMedium: boolean = false;
  private passwordKo: boolean = true;
  private passwordConfirmOk: boolean = false;
  private emailOk: boolean = false;
  private pseudoOk: boolean = false;

  private strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  private mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  private emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public navCtrl: NavController, public http: Http, private storage: Storage) {

  }

  create() {
    if ((this.passwordMedium || this.passwordStrong) && this.emailOk && this.pseudoOk && this.passwordConfirmOk) {
      this.postRequest(this.email, this.password, this.pseudo);
    } else {
      this.error = 'Tous les champs ne sont pas validés';
    }
  }
  verifPseudo() {
    if (this.pseudo.length > 3) {
      this.pseudoOk = true
    }
    else {
      this.pseudoOk = false;
    }
  }
  verifPassword() {
    if (this.strongRegex.test(this.password)) {
      this.passwordStrong = true;
      this.passwordKo = false;
      this.passwordMedium = false;
    }
    else if (this.mediumRegex.test(this.password)) {
      this.passwordStrong = false;
      this.passwordKo = false;
      this.passwordMedium = true;
    } else {
      this.passwordStrong = false;
      this.passwordKo = true;
      this.passwordMedium = false;
    }
  }
  verifPasswordConfirm() {
    if (this.password == this.passwordConfirm) {
      this.passwordConfirmOk = true;
    } else {
      this.passwordConfirmOk = false;
    }
  }

  verifEmail() {
    if (this.emailRegex.test(this.email)) {
      this.emailOk = true;
    } else {
      this.emailOk = false;
    }
  }

  postRequest(username, password, pseudo) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let postParams = {
      userEmail: username,
      userPassword: password,
      userPseudo: pseudo
    }
    this.http.post("http://rankmyfilmcore.azurewebsites.net/api/user/create", postParams, options)
      .subscribe(data => {
        if (JSON.parse(data['_body']).idUser != null) {
          this.storage.set('idUser', JSON.parse(data['_body']).idUser);
          this.storage.set('tokenGenerate', JSON.parse(data['_body']).tokenGenerate);
          this.navCtrl.push(TabsPage);
        }
        else {
          this.error = "Le pseudo ou l'email existe déjà";
        }
      }, error => {
        this.error = error;
      });
  }
}
