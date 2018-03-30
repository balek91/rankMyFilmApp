import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Users } from "../../interface/Users";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  idUser : String = "83359a83-e1a7-4c67-9cc1-8c7a95898799";
  userDetail : Users;
  users : Observable<any>;

  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController
  ) {}
  ionViewDidLoad() {
    this.users = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/user/get/'+this.idUser);
    this.users
    .subscribe(data => {
     this.userDetail = data;
     console.log('user'+ this.userDetail);
     });

  }

}
