import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  data_from_server: any;
  public urls: any;

  visible : boolean = true;
  songs : any;
  searchResults: any = [];
  keyword: string;
  constructor(public data : DataProvider,public navCtrl: NavController, public navParams: NavParams) {
//get the data  from the provider and assign it to songs
    this.data.get_songs().then(data => {this.songs = data;
    });

    this.keyword ="Superman";
    //this.doSearch();


    console.log("We got the songs yet?  " +this.songs);
    var checking = this.loadData();
    var n;
    console.log("checking if this works "+ checking);

    console.log("printing from direct call to get" +  this.data.get_response("getSongs").subscribe( data =>

      { console.log("The actual response data :" + data[0].song_link); 
        this.data_from_server = data;
        //this.set_data(data);
        this.seeData(this.data_from_server);
      }

    ));
  
    console.log("The datahere:" +n);
  
    for (var g in this.urls) //g is an index ... and the item at g is the actual sound link
      {
          console.log("Item fro interface : " + this.urls[g].song_link);
          //console.log(this.songs[0].title);
      }  


      while(!this.data_from_server);
      console.log("data from server printed"+  this.data_from_server);
    
  }


  set_data(the_data)
  {
    this.data_from_server = the_data;
  }
  seeData(d)
  {
    console.log("The data we tried to see : "+ d);
  }


  loadData(){
    this.data.get_requested_data();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  doSearch(event_ : any)
  {
    //onsole.log(event);

    let searchword = event_.target.value; //get  the actual value in the search bar
    console.log(searchword);

    this.searchResults = []; //empty the search results

    for (var song in this.songs) //song is an index
      {
        if (this.songs[song].title == searchword || (this.songs[song].title).includes(searchword) ) //or if it contains the word within it
          {
            this.searchResults.push(this.songs[song]); // add to search results
          }
          //console.log(song['title']);
          //console.log(this.songs[song].title);
          //console.log(this.songs[0].title);
      }
        console.log(this.searchResults);
  }



}
