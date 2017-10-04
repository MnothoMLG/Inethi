import { Component,ViewChild ,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import {AudioProvider} from 'ionic-audio';
import { ActionSheetController } from "ionic-angular";
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import { Platform, AlertController } from "ionic-angular";

import { Http } from '@angular/http';

declare var cordova: any;

/**
 * Generated class for the PlayerInterfacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()



@Component({
  selector: 'page-player-interface',
  templateUrl: 'player-interface.html',
})

export class PlayerInterfacePage {

  //the address to the actual server with the music
  //the servers IP addr
  the_server: any = "http://196.47.234.29:3000/";//"http://localhost:3000/" ; 
  usernames: any;
  parameter1: any;
  links: Promise<any>;

  current_index :  number = 0;
  //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=n
  cordova: any;

  dur_text: any; cur_text: any;

  //DOM elements
  durtimetext: HTMLElement; curtimetext: HTMLElement;

  //booleans
  playing: boolean = true;  song_liked : boolean = false;   seeking : boolean =true;
  
  //Tracks data
  myTracks: any[];  allTracks: any[];  public songs : any;

  //components
  seek_bar; seekslider: any;

  //current Song info
  the_song = new Audio(); currentSong : any; songProgress: number; trackProgress : any;


  //get DOM elements
  @ViewChild('sketchElement')
  sketchElement:ElementRef;

  @ViewChild('curtimetext')
  currenttime: ElementRef;

  @ViewChild('durtimetext')
  durationtext: ElementRef;


  //F I L E    T R A N S F E R S
  storageDir : string = '';

  constructor(public http : Http ,public _audioProvider : AudioProvider, private element: ElementRef,
    public data_2: DataProvider, public navCtrl: NavController, public navParams: NavParams,
    public ASctrl : ActionSheetController, public platform : Platform, private trnsfr : Transfer,
    private file : File , public alertCtrl : AlertController) {
  
    this.data_2.get_songs().then(
      result => {this.songs = result;   
    });
    
    this.parameter1 = navParams.get('param1'); 
    
    console.log("THe passed parameter :" + this.parameter1);
    console.log("get song returned from the provider promise :" +this.songs);
    this.get_req();


    this.myTracks = [
      {
        src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
        artist: 'John Mayer',
        title: 'Who Says',
        art: 'https://upload.wikimedia.org/wikipedia/en/4/4f/Who_Says_cover.jpg',
        preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
      },
      {
        src: 'http://www.datafilehost.com/get.php?file=a89d76ad',
        artist: 'M.L.G',
        title: '#SL',
        art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg',
        preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
      }
    
    ];
      this.currentSong = this.parameter1; // PARAMETER returned by the HomePage;

      console.log(this.currentSong);
      //all files are now stored on the server, so the url must point to the right IP
      this.currentSong.art = this.the_server + this.currentSong.art;
      this.the_song.src = this.the_server + this.currentSong.src;
      this.the_song.loop = true;
      this.the_song.play();


      //file transfer shandis
      if(!this.platform.is('cordova'))
      {
          console.log('run this on an app');
      }

      if (this.platform.is('android'))
      {
          this.storageDir = this.file.dataDirectory;
      }
      else if (this.platform.is('ios'))
      {
        this.storageDir = this.file.documentsDirectory;
      }
      else{
        console.log('Cant locate the storage directory');

        const alertS = this.alertCtrl.create({
          
                          title: "Download Succeeded",
                          subTitle : "Cant locate the storage directory ",
                          buttons:['Ok']
                  });
          
        alertS.present();
      }
      
  }


  //TEST REQUEST
  get_req(){

    this.data_2.get_requested_data().then(data => {
    this.links = data;
    console.log("data from the provider promise :" +data);
  });


  for (var g in this.links) //g is an index ... and the item at g is the actual sound link
    {
        console.log("Item fro interface : " + this.links[g].song_link);
        //console.log(this.songs[0].title);
    }  
  

  }


// P E R F O R M I N G ACTIONS O N A SONG - LIKE -- COMMENT =============================================
like_song()
{
  this.song_liked = true;
  //then add to favourites
}

unlike_song()
{
  this.song_liked = false;
}


showOptions(){
  let acSheet = this.ASctrl.create({

    title :  'More',
    buttons : [
      {
        text : 'Download',
        handler : () => {
          console.log("You like downloading too much, don't you?");
          this.downloadFile();
        }
    },

      {
          text : 'Share',
          handler : () => {
            console.log("You like sharing too much, don't you?");
          }
      },
    ]
  });
  acSheet.present();
}

// F  I  L  E   TRNSFR==============================================================================

downloadFile()
{
  this.data_2.download_file(this.the_song.src, this.currentSong.title);

  // this.platform.ready().then(() => {

  //   const fileTrnsfr : TransferObject = this.trnsfr.create();

  //   const url = this.the_song.src; // this.the_server + this.currentSong.src;

  //   var uri = encodeURI(url);


  //   // file.externalRootDirectory + '/Download/' + 'sample.pdf
  //   //TRY : applicationStorageDirectory
  //   //let dest = cordova.file.dataDirectory  + this.currentSong.title+".mp3";"storage/emulated/0/download"
  //   let dest = cordova.file.externalApplicationStorageDirectory+this.currentSong.title+".mp3";


  //   // to try -- externalApplicationStorageDirectory
  //   //cordova.file.externalRootDirectory;
  //   fileTrnsfr.download(uri,dest,true).then(
  //     (entry)=> {
  //       console.log("Downloaded");

  //       const alertS = this.alertCtrl.create({

  //               title: "Download Succeeded",
  //               subTitle : "File saved in " + dest,
  //               buttons:['Ok']
  //       });

  //       alertS.present();
  //     },
  //   (error) => {

  //       console.log("An error occured  " + error);

  //       const alertF = this.alertCtrl.create({

  //         title: "Download Failed",
  //         subTitle : "File downloading failed :"+ dest + " from" + uri + " error : "+error,
  //         buttons:['Ok']
  //       });

  //       alertF.present();
  //   }
  // );

  // });
}


//The function to handle track seeking =============================================================

seek(event_ : MouseEvent){
  
    if(this.seeking){
      
      console.log("The value you wanted to seek to" + this.seekslider.offsetLeft);
      var value2 = this.seekslider.offsetLeft;
      let seekto = this.the_song.duration * (value2 / 100);
      this.the_song.currentTime = seekto;
      console.log("Seeking happened");
    }
} 




 seektimeupdate(){

  
    var nt = this.the_song.currentTime * (100 / this.the_song.duration);
    this.seekslider.value = nt;
    


    console.log("durationtext" + this.dur_text.innerHTML);
    console.log("currenttime 2" + this.cur_text.innerHTML);


      var curmins = Math.floor(this.the_song.currentTime / 60);
      var cursecs = Math.floor(this.the_song.currentTime - curmins * 60);
      var durmins = Math.floor(this.the_song.duration / 60);
      var dursecs = Math.floor(this.the_song.duration - durmins * 60);
      var cursecs_t ; var  durmins_t; var dursecs_t; var curmins_t;
    if(cursecs < 10){ cursecs_t = "0"+cursecs; }
      if(dursecs < 10){  dursecs_t = "0"+dursecs; }
      if(curmins < 10){  curmins_t = "0"+curmins; }
      if(durmins < 10){  durmins_t = "0"+durmins; }
      
    this.cur_text.innerHTML = curmins_t+":"+cursecs;
    this.dur_text.innerHTML = durmins_t+":"+dursecs;

    console.log("proposed values:" + durmins_t+":"+dursecs);
    console.log("time " + curmins_t+":"+cursecs);

    console.log("durationtext" + this.dur_text.innerHTML);
    console.log("currenttime" + this.cur_text.innerHTML);
  }



// FUNCTIONS THAT INITIALIZE MOST THING ON LOAD ====================================================
  ionViewDidLoad() {
      console.log('ionViewDidLoad PlayerInterfacePage');
      
    }

  ngAfterViewInit() {
    this.seekslider = this.sketchElement.nativeElement;
    console.log("VALUE FROM BAR " + this.seekslider.value);


    this.dur_text = this.durationtext.nativeElement;
    this.cur_text = this.currenttime.nativeElement;

   
    let ob_ref = this;

    this.seekslider.addEventListener("mousedown", function(event){  ob_ref.seeking = true ;ob_ref.seek(event); });
    this.seekslider.addEventListener("mouseup",function(){ ob_ref.seeking=false; });

    this.the_song.ontimeupdate = () => this.seektimeupdate(); //buggy
  }
  ngAfterContentInit() {     
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks; 
  }

  playSelectedTrack() {
    // use AudioProvider to control selected track 
    this.the_song.play();
    this.playing = true;
  }

  showVal(val)
  {
    console.log("Seeked to" + val);
  }
  pauseSelectedTrack() {
    // use AudioProvider to control selected track 
    this.the_song.pause();
    this.playing = false;
 }

 nextTrack()
 {
    this.pauseSelectedTrack();
    if(this.current_index  < this.myTracks.length -1)
    {
        this.current_index++;
        this.currentSong = this.myTracks[this.current_index];
    }
    this.playSelectedTrack()
 }


  prevTrack()
 {
    this.pauseSelectedTrack();
    if(this.current_index  > 0)
    {
        this.current_index--;
        this.currentSong = this.myTracks[this.current_index];
    }
    this.playSelectedTrack()
 }

 onTrackFinished(track: any) {
  console.log('Track finished', track)
  }

  onSliderChanged(event_ : any){
    //let seekValue = event_.target.value;
    console.log("slider used");
  }

}
