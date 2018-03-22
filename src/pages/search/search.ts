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
idUser : String = "6450af28-87ad-4e41-b7b5-08d58f412dd4";
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
    this.films = this.httpClient.get('http://www.omdbapi.com/?s='+this.myInput+'&apikey=dbc4e73d');
    this.films
    .subscribe(data => {
      //console.log('my data: ', data);
      if(data.Response == 'True'){
      //  this.title = data.Search[0].Title;
        this.titles = new Array<String>();
        this.posters = new Array<String>();
        this.movies = new Array<Films>();
        for (var i=0; i<data.Search.length; i++){
          //console.log("test" + data.Search[i].Title);
          this.posters.push(data.Search[i].Poster);
          this.titles.push(data.Search[i].Title);
          this.movies.push(data.Search[i]);
        }
       // console.log(this.movies);
      }  else{
        this.titles = new Array<String>();
        this.posters = new Array<String>();
       // console.log(this.titles);
      } 
  
    })

  }
  else if(this.searchCrit=="users"){
    console.log('https://rankmyfilmcore.azurewebsites.net/api/user/getByName/'+this.myInput);
    this.users = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/user/getByName/'+this.myInput);
    this.users
    .subscribe(data => {
      this.usersList = new Array<Users>();
      for (var i=0; i<data.length; i++){
        this.usersList.push(data[i]);
        console.log(this.usersList);
      // console.log()
      }
    })
  }


}

goToDetail(movie: Films) {
  this.films = this.httpClient.get('http://www.omdbapi.com/?i='+movie.imdbID+'&apikey=dbc4e73d');
  this.films
  .subscribe(data => {
   this.movieDetail = data;
   this.maNote = this.httpClient.get('http://rankmyfilmcore.azurewebsites.net/api/rank/GetRankModelByUserAndFilms/'+this.idUser+'/'+this.movieDetail.imdbID);
   this.maNote.subscribe(data => {
    this.movieDetail.MaNote = data[0].vote;
    this.navCtrl.push(MovieDetailPage, this.movieDetail);
   });
   
  })
}

goToDetailUser(user: Users) {
  this.users = this.httpClient.get('https://rankmyfilmcore.azurewebsites.net/api/user/getByName/'+user.pseudo);
  this.users
  .subscribe(data => {
   this.userDetail = data[0];
   console.log('user'+ this.userDetail);
    this.navCtrl.push(UserDetailPage, this.userDetail);
   });

}
}
