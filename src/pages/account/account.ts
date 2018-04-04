import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Users } from "../../interface/Users";
import { Observable } from 'rxjs/Observable';
import { Films } from "../../interface/Films";
import { FilmsDetails } from "../../interface/FilmsDetails";
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { UserDetailMoviesPage } from "../user-detail-movies/user-detail-movies";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  idUser : String = "5ce662e2-ec10-4e6f-8fbe-02d03f88d66d";
  userDetail : Users;
  users : Observable<any>;
  films: Observable<any>;
  movieDetail : FilmsDetails;
  maNote : Observable<any>;

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
     console.log('http://rankmyfilmcore.azurewebsites.net/api/rank/getRankByDate/'+this.idUser+'/10');
     this.films = this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/getRankByDate/'+this.idUser+'/10');
    this.films.subscribe(data => {
      this.userDetail.film = data;
      for (var i=0; i<data.length; i++){
        console.log(data[i].poster_path)
        this.userDetail.film[i].poster = 'http://image.tmdb.org/t/p/w185/' + data[i].poster;
        if(this.userDetail.film[i].vote=='5'){
          this.userDetail.film[i].vote = "★ ★ ★ ★ ★";
         }else if(this.userDetail.film[i].vote=='4'){
          this.userDetail.film[i].vote = "★ ★ ★ ★";
         }
         else if(this.userDetail.film[i].vote=='3'){
          this.userDetail.film[i].vote = "★ ★ ★";
         }
         else if(this.userDetail.film[i].vote=='2'){
          this.userDetail.film[i].vote = "★ ★";
         }
         else if(this.userDetail.film[i].vote=='1'){
          this.userDetail.film[i].vote = "★";
         }
         else{
          this.userDetail.film[i].vote = "★ ★ ★";
         }
      } 
    });
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

}
