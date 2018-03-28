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

  idUser : String = "f9b62405-5493-4460-a12b-85e012ac2b81";
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
