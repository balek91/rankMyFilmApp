import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Users } from "../../interface/Users";
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html'
})

export class UserDetailPage {

  idUser : String = "6450af28-87ad-4e41-b7b5-08d58f412dd4";
  userDetail : Users;

  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.userDetail = this.navParams.data;
    console.log('test' + this.userDetail.pseudo);
  }
  // ranking(selectedValue: any) {
  //    this.rankMovie=this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/createRank/'+this.idUser+'/'+this.movieDetail.imdbID+'/'+selectedValue);
  //   this.rankMovie.subscribe(data => {
  //     });
  // }
}



