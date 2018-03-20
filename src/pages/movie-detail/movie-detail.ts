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
  films: Observable<any>;
  movieDetail : FilmsDetails;

  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    // this.movieDetail = new FilmsDetails;
  
    // this.films = this.httpClient.get('http://www.omdbapi.com/?i='+this.movie.imdbID+'&apikey=dbc4e73d');
    // this.films
    // .subscribe(data => {
    //  this.movieDetail = data;
    //   console.log('my data: ', this.movieDetail.Title);
    // })
  }


  ionViewDidLoad() {
    // this.movieDetail = new Array<FilmsDetails>();
    this.movieDetail = this.navParams.data;
    console.log('data'+this.navParams.data.toString());
    console.log('film'+this.movieDetail.Poster);

  }
  ranking(selectedValue: any) {
    console.log('Selected', selectedValue);
  }
}



