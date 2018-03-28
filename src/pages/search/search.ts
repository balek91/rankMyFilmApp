import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Films } from "../../interface/Films";
import { Users } from "../../interface/Users";
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { UserDetailPage } from "../user-detail/user-detail";
import { FilmsDetails } from "../../interface/FilmsDetails";

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
idUser : String = "f9b62405-5493-4460-a12b-85e012ac2b81";
movies = new Array<Films>();
movieDetail : FilmsDetails;
userDetail : Users;
usersList : Array<Users>;
searchCrit: string = "movies";
  constructor(public httpClient: HttpClient, public navCtrl: NavController) {
    this.titles = new Array<String>();
    this.posters = new Array<String>();
    this.movies = new Array<Films>();
  }
  // constructor(private http: HTTP){}
  onInput(){
  console.log(this.myInput);

    if(this.searchCrit=="movies"){
    this.films = this.httpClient.get('https://api.themoviedb.org/3/search/movie?api_key=3d65378d738d4283a901865f5598d212&page=1&language=fr&query='+this.myInput);
    this.films
    .subscribe(data => {

        this.titles = new Array<String>();
        this.posters = new Array<String>();
        this.movies = new Array<Films>();
        console.log(data);
         for (var i=0; i<data.results.length; i++){

          this.movies.push(data.results[i]);
          this.movies[i].poster = 'http://image.tmdb.org/t/p/w185/' + this.movies[i].poster_path ;
        } 
    })

  }
  
  else if(this.searchCrit=="users"){
    console.log('https://rankmyfilmcore.azurewebsites.net/api/user/getByName/'+this.myInput);
    this.users = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/user/getByName/'+this.myInput);
    this.users
    .subscribe(data => {
      if(data!=null){
      this.usersList = new Array<Users>();
      for (var i=0; i<data.length; i++){
        this.usersList.push(data[i]);
      }
    }
    })
  }


}

goToDetail(movie: Films) {
  this.films = this.httpClient.get('https://api.themoviedb.org/3/movie/'+movie.id+'?api_key=3d65378d738d4283a901865f5598d212&language=fr');
  this.films
  .subscribe(data => {
   this.movieDetail = data;
   this.movieDetail.poster = 'http://image.tmdb.org/t/p/w185/' + data.poster_path;
   this.movieDetail.genresList = new Array<String>();
   for(var i = 0 ; i< data.genres.length; i++){
    this.movieDetail.genresList.push(data.genres[i].name);
   } 
   this.maNote = this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/GetRankModelByUserAndFilms/'+this.idUser+'/'+this.movieDetail.id);
   this.maNote.subscribe(data => {
     if(data[0]!= null){
      this.movieDetail.maNote = data[0].vote;
     }else{
       this.movieDetail.maNote = '3';
     }
    console.log(this.movieDetail);
    this.navCtrl.push(MovieDetailPage, this.movieDetail);
   });
   
  })
}

goToDetailUser(user: Users) {
  this.users = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/user/get/'+user.id);
  this.users
  .subscribe(data => {
   this.userDetail = data;
   console.log('user'+ this.userDetail);
    this.navCtrl.push(UserDetailPage, this.userDetail);
   });

}
}
