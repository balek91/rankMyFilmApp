import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Users } from "../../interface/Users";
import { NavParams } from 'ionic-angular';
import { UserDetailMoviesPage } from "../user-detail-movies/user-detail-movies";
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { FilmsDetails } from "../../interface/FilmsDetails";
import { LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html'
})

export class UserDetailPage {

  userDetail : Users;
  suivre: Observable<any>;
  films: Observable<any>;
  movieDetail : FilmsDetails;
  maNote : Observable<any>;
  loading;

  // victor
  // idUser : String = "96646d37-0265-4c4e-8bad-3be95558bc79";
  //enzo 
  //idUser : String = "60b279ec-02c9-491e-8b2f-60c3f91af182";
  //antoine
  idUser : String = "5ce662e2-ec10-4e6f-8fbe-02d03f88d66d";
  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.userDetail = this.navParams.data;
    this.storage.get('idUser').then((val) => {
      console.log('Your token is', val);
      this.idUser = val;
    });
  }

  unfollow(){
    this.loading = this.loadingCtrl.create({});
    this.loading.present();
    this.suivre = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/friend/unfollow/'+this.idUser+'/'+this.userDetail.id);
    this.suivre.subscribe(data => {
      this.userDetail.jeLeSuis=false;
      this.loading.dismiss();
           });
  }


  follow(){
    this.loading = this.loadingCtrl.create({});
    this.loading.present();
    this.suivre = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/friend/follow/'+this.idUser+'/'+this.userDetail.id);
    this.suivre.subscribe(data => {
      this.userDetail.jeLeSuis=true;
      this.loading.dismiss();
           });
  }

  goToListMovie(user: Users) {
    this.loading = this.loadingCtrl.create({});
    this.loading.present();
    this.films = this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/get/'+user.id);
    this.films.subscribe(data => {
      
      user.film = data;

      for (var i=0; i<data.length; i++){
        user.film[i].poster = 'http://image.tmdb.org/t/p/w185/' + data[i].poster;
        if(user.film[i].vote=='5'){
          user.film[i].vote = "★ ★ ★ ★ ★";
         }else if(user.film[i].vote=='4'){
          user.film[i].vote = "★ ★ ★ ★";
         }
         else if(user.film[i].vote=='3'){
          user.film[i].vote = "★ ★ ★";
         }
         else if(user.film[i].vote=='2'){
          user.film[i].vote = "★ ★";
         }
         else if(user.film[i].vote=='1'){
          user.film[i].vote = "★";
         }
         else{
          user.film[i].vote = "★ ★ ★";
         }
      } 
      user.filmSearch = user.film; 
      this.loading.dismiss();
      this.navCtrl.push(UserDetailMoviesPage, user);
           });
    
  }
  goToDetail(movie: String) {
    this.loading = this.loadingCtrl.create({});
    this.loading.present();
    this.films = this.httpClient.get('https://api.themoviedb.org/3/movie/'+movie+'?api_key=3d65378d738d4283a901865f5598d212&language=fr');
    this.films
    .subscribe(data => {
      console.log(data);
     this.movieDetail = data;
     this.movieDetail.poster = 'http://image.tmdb.org/t/p/w185/' + data.poster_path;
     this.movieDetail.genresList = new Array<String>();
     for(var i = 0 ; i< data.genres.length; i++){
      this.movieDetail.genresList.push(data.genres[i].name);
     } 
     this.maNote = this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/GetRankModelByUserAndFilms/'+this.idUser+'/'+this.movieDetail.id);
     this.maNote.subscribe(data => {
       if(data!= null){
        this.movieDetail.maNote = data.vote;
        this.movieDetail.moyenneByAllUser = data.moyenneByAllUser;
        this.movieDetail.moyenneByFriend = data.moyenneByFriend;
       }else{
         this.movieDetail.maNote = '3';
         this.movieDetail.moyenneByAllUser = '3';
         this.movieDetail.moyenneByFriend = '3';
       }
       this.loading.dismiss();
      this.navCtrl.push(MovieDetailPage, this.movieDetail);
     });
     
    })
  }
}



