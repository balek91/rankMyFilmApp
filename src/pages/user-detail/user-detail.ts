import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Users } from "../../interface/Users";
import { NavParams } from 'ionic-angular';
import { UserDetailMoviesPage } from "../user-detail-movies/user-detail-movies";
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { FilmsDetails } from "../../interface/FilmsDetails";


@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html'
})

export class UserDetailPage {

  idUser : String = "5ce662e2-ec10-4e6f-8fbe-02d03f88d66d";
  userDetail : Users;
  suivre: Observable<any>;
  films: Observable<any>;
  movieDetail : FilmsDetails;
  maNote : Observable<any>;

  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.userDetail = this.navParams.data;
    console.log('test' + this.userDetail.film.length);
  }

  follow(){
    this.suivre = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/friend/suivre/'+this.idUser+'/'+this.userDetail.id);
    this.suivre.subscribe(data => {
      this.userDetail.jeLeSuis=true;
           });
  }

  goToListMovie(user: Users) {
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
      console.log('user' + user);
      this.navCtrl.push(UserDetailMoviesPage, user);
           });
    
  }
  goToDetail(movie: String) {

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
       
      this.navCtrl.push(MovieDetailPage, this.movieDetail);
     });
     
    })
  }
}



