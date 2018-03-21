import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Films } from "../../interface/Films";
import { MovieDetailPage } from "../movie-detail/movie-detail";
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
maNote : Observable<any>;
idUser : String = "6450af28-87ad-4e41-b7b5-08d58f412dd4";
movies = new Array<Films>();
movieDetail : FilmsDetails;
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
  else{
    console.log('User Search');
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
}
