import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Films } from "../../interface/Films";
import { Users } from "../../interface/Users";
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { UserDetailPage } from "../user-detail/user-detail";
import { FilmsDetails } from "../../interface/FilmsDetails";
import { AccountPage } from "../account/account";
import { LoadingController} from 'ionic-angular';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
myInput: String;
titles : Array<String>;
posters : Array<String>;
films: Observable<any>;
users: Observable<any>;
maNote : Observable<any>;
loading;

  // victor
  // idUser : String = "96646d37-0265-4c4e-8bad-3be95558bc79";
  //enzo 
    //idUser : String = "60b279ec-02c9-491e-8b2f-60c3f91af182";
  //antoine
  idUser : String = "5ce662e2-ec10-4e6f-8fbe-02d03f88d66d";

movies = new Array<Films>();
movieDetail : FilmsDetails;
userDetail : Users;
usersList : Array<Users>;
searchCrit: string = "movies";
  constructor(public httpClient: HttpClient, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.titles = new Array<String>();
    this.posters = new Array<String>();
    this.movies = new Array<Films>();
  }
  onInput(){
    if(this.searchCrit=="movies"){
      // this.loading = this.loadingCtrl.create({});
      // this.loading.present();
    this.films = this.httpClient.get('https://api.themoviedb.org/3/search/movie?api_key=3d65378d738d4283a901865f5598d212&page=1&language=fr&query='+this.myInput);
    this.films
    .subscribe(data => {
        this.titles = new Array<String>();
        this.posters = new Array<String>();
        this.movies = new Array<Films>();
         for (var i=0; i<data.results.length; i++){
          this.movies.push(data.results[i]);
          this.movies[i].poster = 'http://image.tmdb.org/t/p/w185/' + this.movies[i].poster_path ;
        } 
        // this.loading.dismiss();
    })
  }
  else if(this.searchCrit=="users"){
    // this.loading = this.loadingCtrl.create({});
    // this.loading.present();
    this.users = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/user/getByName/'+this.myInput);
    this.users
    .subscribe(data => {
      if(data!=null){
      this.usersList = new Array<Users>();
      for (var i=0; i<data.length; i++){
        this.usersList.push(data[i]);
      }
    }
    // this.loading.dismiss();
    })
  }
}
goToDetail(movie: Films) {
  this.loading = this.loadingCtrl.create({});
  this.loading.present();
  this.films = this.httpClient.get('https://api.themoviedb.org/3/movie/'+movie.id+'?api_key=3d65378d738d4283a901865f5598d212&language=fr');
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

goToDetailUser(user: Users) {
  this.loading = this.loadingCtrl.create({});
  this.loading.present();
  this.users = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/user/get/'+this.idUser+'/'+user.id);
  this.users
  .subscribe(data => {
    console.log(data);
   this.userDetail = data;
    
    this.films = this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/getRankByDate/'+user.id+'/10');
    this.films.subscribe(data => {
      this.userDetail.film = data;
      for (var i=0; i<data.length; i++){
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
      this.loading.dismiss();
      this.navCtrl.push(UserDetailPage, this.userDetail);
    });
     });

}
}
