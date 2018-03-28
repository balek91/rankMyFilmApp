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

  idUser : String = "f9b62405-5493-4460-a12b-85e012ac2b81";
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



