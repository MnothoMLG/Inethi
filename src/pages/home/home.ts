import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StreamingMedia, StreamingAudioOptions} from '@ionic-native/streaming-media';
import {ActionSheetController} from 'ionic-angular';
import { PlayerInterfacePage } from "../player-interface/player-interface";
import { TabsPage } from "../tabs/tabs";
import { DataProvider } from "../../providers/data/data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  [x: string]: any;
  //var : type = default value
  tracks : any;
  playing : boolean = true;
  currentSong : any;


  constructor(private data: DataProvider , public navCtrl: NavController,private streamingMedia: StreamingMedia, public ASctrl : ActionSheetController) {


    this.user_info = {username: "USER1", 
    bio : "Aspiring maskandi+trap fussion artist.Based in Cape Twon.The tiing goes  skrrhaa... thu thu dipi du pum pum",
    followers : 158, following: 5
    };
    this.tracks = [

      {  src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Who Says (Get Stoned)',
      art: 'https://upload.wikimedia.org/wikipedia/en/4/4f/Who_Says_cover.jpg'},

      {src: 'http://www.datafilehost.com/get.php?file=a89d76ad',
      artist: 'M.L.G',
      title: '#SL',
      art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg'},

      {title: 'Addis Ababa', artist:'Culture', playing : false,src:"'https://soundcloud.com/mlg654/superman-w-lucky-zulu'",progress :0,
      art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg'},

      {title: 'Throw It Up', artist:'Lil Wayne', playing : false,src:"'https://soundcloud.com/mlg654/throw-up'",
      progress :0,art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg'},


      {title: 'Petty 101', artist:'M.L.G', playing : false,src:"'https://soundcloud.com/mlg654/petty-101-ft-s-e-t'",
      progress :0,art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg'},
      {title: 'KAS Pt.3', artist:'M.L.G', playing : false,src:"'https://soundcloud.com/mlg654/kas-pt-3'",
      progress :0,art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg'}

    ]; 
    
    this.currentSong = this.tracks[0]; //the current playing son
  }




  ngAfterViewInit() {
    this.init_songs();
  }
//we can pass options to calls
  startAudio(song_url: string)
  {
    let options : StreamingAudioOptions = {
        successCallback : () => {console.log("r")}, //if the audio was successfully played
        errorCallback : () => {console.log("noo")},
        //orientation : 'potrait',
        initFullscreen : false
    }

    //playing the actual audio  now
    this.streamingMedia.playAudio(song_url,options);

  }
  stopAudio(){
    this.streamingMedia.stopAudio();
  }

  //Showing the options on a song

  showOptions(){
    let acSheet = this.ASctrl.create({

      title :  'Options',
      buttons : [
        {
          text : 'Like',
          handler : () => {
            console.log("You like commenting too much, don't you?");
          }
      },

        {
            text : 'Comment',
            handler : () => {
              console.log("You like commenting too much, don't you?");
            }
        },
        {
          text : 'Download',
          handler : () => {
            console.log("You like download too much, don't you?");
          }
        },{
          text : 'Share',
          handler : () => {
            console.log("You like sharing too much, don't you?");
          }
        }
      ]
    });
    acSheet.present();
}


  playTrack(track)
  {
    for(let currentTrack of this.tracks)
      {
        if(currentTrack.playing)
          {
            this.pauseTrack(currentTrack);
          }
      }

      track.playing = true; //play the track passed in as an arg
      this.currentSong = track;
      this.startAudio(track.url); //play the current song using the url


      //now open the music player interface
      //this.tabs.allow_page_through(PlayerInterfacePage,{param1: 'John'}); //bring up the interfaceon top of tab
    // this.app.getRootNav()();
    this.navCtrl.push(PlayerInterfacePage, {
           param1: this.currentSong
       });
  }

  //function for pausing the currently playing song
  pauseTrack(track)
  {
    track.playing = false;
    //then do the actual music stop
    this.stopAudio();
  }

  //skip thetrack
  nextTrack()
  {
    let index = this.tracks.indexOf(this.currentSong);
    index >= this.tracks.length -1 ? index = 0 : index++;
    // condition ? if true : else
    this.playTrack(this.tracks[index]);

  }

  prevTrack(){

    let index = this.tracks.indexOf(this.currentSong);
    index > 0 ? index-- : index = this.tracks.length -1;

    this.playTrack(this.tracks[index]);

  }
  
   like(track) {
    this.visible = !this.visible;
   }
 
    delete(item) {
      let alert = this.alert_ctrl.create({
        title: 'Delete',
        message: 'Are you sure you want to delete this item?',
        buttons: [
        {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => { console.log('Delete has been click');}
          }
        ]
      });
      alert.present();
  }

 //make the song private
  private(item) {
  let alert = this.alert_ctrl.create({
      title: 'Privacy',
      message: 'Are you sure you want to make this item private ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Private',
          handler: () => { console.log('Private has been click');  }
        }
      ]
    });
    alert.present();
    }


    init_songs()
    {
      //getting the songs
      console.log("Getting the songs");
      console.log(this.data.get_response("getSongs").subscribe( data =>
        
      { 
          console.log("The actual response songs :" + data); 
                this.tracks = data;
                //this.authenticate();
      }
      ));
    }

}
