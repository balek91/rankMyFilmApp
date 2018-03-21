import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Films } from "../../interface/Films";
import { FilmsDetails } from "../../interface/FilmsDetails";
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html'
})

export class MovieDetailPage {
  movie: Films;
  isFavorite: boolean = false;
  rankMovie : Observable<any>;
  maNote : Observable<any>;
  movieDetail : FilmsDetails;
  idUser : String = "6450af28-87ad-4e41-b7b5-08d58f412dd4";
  maNoteAffichage : String;

  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.movieDetail = this.navParams.data;

       if(this.movieDetail.MaNote=='5'){
        this.maNoteAffichage = "★ ★ ★ ★ ★";
       }else if(this.movieDetail.MaNote=='4'){
        this.maNoteAffichage = "★ ★ ★ ★";
       }
       else if(this.movieDetail.MaNote=='3'){
        this.maNoteAffichage = "★ ★ ★";
       }
       else if(this.movieDetail.MaNote=='2'){
        this.maNoteAffichage = "★ ★";
       }
       else if(this.movieDetail.MaNote=='1'){
        this.maNoteAffichage = "★";
       }
       else{
        this.maNoteAffichage = "★ ★ ★";
       }
  }
  ranking(selectedValue: any) {
     this.rankMovie=this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/createRank/'+this.idUser+'/'+this.movieDetail.imdbID+'/'+selectedValue);
    this.rankMovie.subscribe(data => {
      });
  }
}



