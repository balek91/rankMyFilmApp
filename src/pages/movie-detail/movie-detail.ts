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
  moyenneAllUser : string;
  moyenneFriend : string;
  movieDetail : FilmsDetails;
  idUser : String = "83359a83-e1a7-4c67-9cc1-8c7a95898799";
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
       console.log(parseFloat(this.movieDetail.moyenneByFriend));
       if(parseFloat(this.movieDetail.moyenneByFriend)>=4.5){
        this.moyenneFriend = "★ ★ ★ ★ ★";
       }else if(parseFloat(this.movieDetail.moyenneByFriend)>=3.5 && parseFloat(this.movieDetail.moyenneByFriend)<4.5){
        this.moyenneFriend = "★ ★ ★ ★";
       }
       else if(parseFloat(this.movieDetail.moyenneByFriend)>=2.5 && parseFloat(this.movieDetail.moyenneByFriend)<3.5){
        this.moyenneFriend = "★ ★ ★";
       }
       else if(parseFloat(this.movieDetail.moyenneByFriend)>=1.5 && parseFloat(this.movieDetail.moyenneByFriend)<2.5){
        this.moyenneFriend = "★ ★";
       }
       else if(parseFloat(this.movieDetail.moyenneByFriend)>=1 && parseFloat(this.movieDetail.moyenneByFriend)<1.5){
        this.moyenneFriend = "★";
       }
       else if(parseFloat(this.movieDetail.moyenneByFriend)<1){
        this.moyenneFriend = "Aucun Amis n'a noté le film";
       }
       console.log(parseFloat(this.movieDetail.moyenneByAllUser));
       if(parseFloat(this.movieDetail.moyenneByAllUser)>=4.5){
        this.moyenneAllUser = "★ ★ ★ ★ ★";
       }else if(parseFloat(this.movieDetail.moyenneByAllUser)>=3.5 && parseFloat(this.movieDetail.moyenneByAllUser)<4.5){
        this.moyenneAllUser = "★ ★ ★ ★";
       }
       else if(parseFloat(this.movieDetail.moyenneByAllUser)>=2.5 && parseFloat(this.movieDetail.moyenneByAllUser)<3.5){
        this.moyenneAllUser = "★ ★ ★";
       }
       else if(parseFloat(this.movieDetail.moyenneByAllUser)>=1.5 && parseFloat(this.movieDetail.moyenneByAllUser)<2.5){
        this.moyenneAllUser = "★ ★";
       }
       else if(parseFloat(this.movieDetail.moyenneByAllUser)>=1 && parseFloat(this.movieDetail.moyenneByAllUser)<1.5){
        this.moyenneAllUser = "★";
       }
       else if(parseFloat(this.movieDetail.moyenneByAllUser)<1){
        this.moyenneAllUser = "Aucun Utilisateur n'a noté le film";
       }
       console.log(this.moyenneAllUser);
        console.log(this.moyenneFriend);

  }
  ranking(selectedValue: any) {
    
     this.rankMovie=this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/createRank/'+this.idUser+'/'+this.movieDetail.id+'/'+selectedValue);
    this.rankMovie.subscribe(data => {
      console.log(data);
      this.movieDetail.moyenneByAllUser = data.moyenneByAllUser;
      this.movieDetail.moyenneByFriend = data.moyenneByFriend;
      this.ionViewDidLoad();
      });
  }
}



