import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
/**
 * Generated class for the MyMusicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-music',
  templateUrl: 'my-music.html',
})
export class MyMusicPage {
  list_index: number;
  lists_only: boolean = false;
  favs_only: boolean = false;
  liked_tracks: any;
  myplaylists: any;
  fav_index : number = 3;
  constructor(public data : DataProvider,public navCtrl: NavController, public navParams: NavParams) {
  

    this.data.get_likes().then(result => {this.liked_tracks = result; //get the liked songs
    });



    this.data.get_playlists().then(result => {this.myplaylists = result; //get the liked songs
    });

    console.log(this.data.get_data_afterload());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyMusicPage');
  }


  exploreAllFavs()
  {
    this.favs_only = true;
    this.fav_index = this.liked_tracks.length - 1;
    this.list_index = 0;
  }
  explorePlaylists()
  {
    this.lists_only = true;
    this.fav_index = this.liked_tracks.length - 1;
    this.list_index = this.myplaylists.length -1;
  }
}
