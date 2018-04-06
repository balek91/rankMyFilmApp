import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Films } from "../../interface/Films";
import { FilmsDetails } from "../../interface/FilmsDetails";
import { NavParams } from 'ionic-angular';
import { LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';


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
  maNoteAffichage : String;
  poster_path :String;
  loading;
    // victor
  // idUser : String = "96646d37-0265-4c4e-8bad-3be95558bc79";
  //enzo 
  //idUser : String = "60b279ec-02c9-491e-8b2f-60c3f91af182";
  //antoine
  idUser : String ;

  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.storage.get('idUser').then((val) => {
      console.log('Your token is', val);
      this.idUser = val;
    this.movieDetail = this.navParams.data;
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
      });
      
  }
  ranking(selectedValue: any) {
    this.loading = this.loadingCtrl.create({});
    this.loading.present();
   this.poster_path = this.movieDetail.poster_path.substr(1);
     this.rankMovie=this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/createRank/'+this.idUser+'/'+this.movieDetail.id+'/'+selectedValue+'/'+this.poster_path+'/'+this.movieDetail.title);
    this.rankMovie.subscribe(data => {
      console.log(data);
      this.movieDetail.moyenneByAllUser = data.moyenneByAllUser;
      this.movieDetail.moyenneByFriend = data.moyenneByFriend;
      this.ionViewDidLoad();
      this.loading.dismiss();
      });
  }
}



