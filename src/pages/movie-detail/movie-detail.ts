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
  idUser : String = "f9b62405-5493-4460-a12b-85e012ac2b81";
  maNoteAffichage : String;

  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.movieDetail = this.navParams.data;
    console.log(this.movieDetail);
       if(this.movieDetail.maNote=='5'){
        this.maNoteAffichage = "★ ★ ★ ★ ★";
       }else if(this.movieDetail.maNote=='4'){
        this.maNoteAffichage = "★ ★ ★ ★";
       }
       else if(this.movieDetail.maNote=='3'){
        this.maNoteAffichage = "★ ★ ★";
       }
       else if(this.movieDetail.maNote=='2'){
        this.maNoteAffichage = "★ ★";
       }
       else if(this.movieDetail.maNote=='1'){
        this.maNoteAffichage = "★";
       }
       else{
        this.maNoteAffichage = "★ ★ ★";
       }
  }
  ranking(selectedValue: any) {
     this.rankMovie=this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/createRank/'+this.idUser+'/'+this.movieDetail.id+'/'+selectedValue);
    this.rankMovie.subscribe(data => {
      });
  }
}



