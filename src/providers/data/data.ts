import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions } from '@angular/http';
import { ActionSheetController } from "ionic-angular";
import {File} from '@ionic-native/file';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { Platform, AlertController } from "ionic-angular";

import 'rxjs/add/operator/map';
declare var cordova: any;
/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {
  data2: any;
  song_data: any;
  liked_songs:any;
  the_server: any = "http://196.24.176.116:3000/";
  playlists :any;
  constructor(public http: Http , public ASctrl : ActionSheetController, public platform : Platform, private trnsfr : Transfer,
    private file : File , public alertCtrl : AlertController) {
    console.log('Hello DataProvider Provider');

    this.song_data = [
      
            {title: 'Chronic', artist:'M.L.G', album:"Emotion & The Motion", playing : false, src:"'https://soundcloud.com/mlg654/chronic-adds-by-d-star'", art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg',progress :0},
            {title: 'Luv Up', artist:'KRS',album: "Soca and Blues", playing : false,src: "'https://soundcloud.com/mlg654/eyes-on-you'",art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg',progress :0},
            {title: 'Superman', artist:'M.L.G', playing : false,src:"'https://soundcloud.com/mlg654/superman-w-lucky-zulu'", art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg',progress :0},
            {title: 'Addis Ababa', artist:'Culture',album: "International Herb", playing : false,src:"'https://soundcloud.com/mlg654/lately'", art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg',progress :0},
            {title: 'Throw Up', artist:'M.L.G', album:"Emotion & The Motion", playing : false,src:"'https://soundcloud.com/mlg654/throw-up'",art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg',progress :0},
            {title: 'Petty 101', artist:'M.L.G', album:"Emotion & The Motion", playing : false,src:"'https://soundcloud.com/mlg654/petty-101-ft-s-e-t'", art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg',progress :0},
            {title: 'KAS Pt.3', artist:'M.L.G', album:"Emotion & The Motion", playing : false,src:"'https://soundcloud.com/mlg654/kas-pt-3'", art: 'https://assets.audiomack.com/mlg-1/sl-ft-wanga-275-275-1487412923.jpg',progress :0}
      
          ];


          this.liked_songs = [
            
                  {title: 'Got Money', artist:'Lil Wayne',album :"The Carter 3", playing : false, src:"'https://soundcloud.com/mlg654/chronic-adds-by-d-star'", progress :0},
                  {title: 'Like So', artist:'KRS', album :"Soca and Blues",playing : false,src: "'https://soundcloud.com/producedbykrs/like-so'",progress :0},
                  {title: 'Superman', artist:'M.L.G', playing : false,src:"'https://soundcloud.com/mlg654/superman-w-lucky-zulu'",progress :0},
                  {title: 'Lately', artist:'M.L.G', playing : false,src:"'https://soundcloud.com/mlg654/lately'",progress :0},
                  {title: 'Throw Up', artist:'M.L.G', playing : false,src:"'https://soundcloud.com/mlg654/throw-up'",progress :0}, 
          ];

          this.playlists = [
            
                  {name: 'Sunday Jams', song_count: 13},
                  {name: 'Raps', song_count: 9},
                  {name: 'Raggae', song_count: 5},
                  {name: 'Rock', song_count: 7},
                  {name: 'Gospel', song_count: 20}
          ];

          //{ params: { "key1": "value1", "key2": "value2" } }

        
  }

  //gets the data from the method that retrieves if from server 
  get_data_afterload(){
    this.get_requested_data().then(data => {
      return data;
    });
  }

  get_response(path)
  {
    return this.http.get(this.the_server+path) //getSongs/
    .map(res => res.json());

  }

  
  get_requested_data()
  {
      if (this.data2) {
        return Promise.resolve(this.data2);
      }
   
      return new Promise(resolve => {  //ensures that null is never returned? resolve?
        
        this.http.get('http://localhost:3000/getSongs/')
        .map(res => res.json())
        .subscribe(data => {
        this.data2 = data;
         
          for (var g in this.data2) //g is an index ... and the item at g is the actual sound link
            {
                console.log("Item in response I got : " + this.data2[g].song_link);
                //console.log(this.songs[0].title);
            }   
            resolve(this.data2);
        });  
      }).then((data) =>{
          console.log(data);
      });
  }



  get_songs()
  {
    return Promise.resolve(this.song_data);
  }
  
  get_playlists()
  {
    return Promise.resolve(this.playlists);
  }

  get_likes()
  {
    return Promise.resolve(this.liked_songs);
  }


  send_register_request(credentials)
  {

    console.log("Sending request");
    // let req_headers = new Headers();
    // req_headers.append('Content-Type', 'application/json');
    // let RequestOpts = new RequestOptions({ headers: req_headers});
    let body = credentials;

    // let body = new FormData();
    // body.append('message', "POST req msg");
    // body.append('password', "Judt");

    this.http.post(this.the_server+'register', body)
    .map(res => res.json())
    .subscribe(
      data => {

        console.log("Response from server ")
        console.log(data);

      }
    );

    console.log("Request sent");
  }



  record_song_entry(song_details)
  {

    this.http.post(this.the_server+'newSong', song_details)
    .map(res => res.json())
    .subscribe(
      data => {

        console.log("Response from server ")
        console.log(data);

      }
    );


  }


  //====================================== F I L E    T R A N S F E R ============================================


  download_file(url,title)
  {

    this.platform.ready().then(() => {
      
          const fileTrnsfr : TransferObject = this.trnsfr.create();
      
         // const url = this.the_song.src; // this.the_server + this.currentSong.src;
      
          var uri = encodeURI(url);
      
      
          // file.externalRootDirectory + '/Download/' + 'sample.pdf
          //TRY : applicationStorageDirectory
          //let dest = cordova.file.dataDirectory  + this.currentSong.title+".mp3";"storage/emulated/0/download"
          let dest = cordova.file.externalApplicationStorageDirectory+title+".mp3";
      
      
          // to try -- externalApplicationStorageDirectory
          //cordova.file.externalRootDirectory;
          fileTrnsfr.download(uri,dest,true).then(
            (entry)=> {
              console.log("Downloaded");
      
              const alertS = this.alertCtrl.create({
      
                      title: "Download Succeeded",
                      subTitle : "File saved in " + dest,
                      buttons:['Ok']
              });
      
              alertS.present();
              return true;
            },
          (error) => {
      
              console.log("An error occured  " + error);
      
              const alertF = this.alertCtrl.create({
      
                title: "Download Failed",
                subTitle : "File downloading failed :"+ dest + " from" + uri + " error : "+error,
                buttons:['Ok']
              });
      
              alertF.present();
              return false;
          }
        ); 
    });
  }


  upload_file(device_url,path_on_server,file_name)
  {

    this.platform.ready().then(() => {
      
          const fileTrnsfr : TransferObject = this.trnsfr.create();
      
         // const url = this.the_song.src; // this.the_server + this.currentSong.src;
      
          var uri = encodeURI(device_url);
          let dest = this.the_server + path_on_server;

          let options: FileUploadOptions = {
            fileKey: 'song',
            fileName: file_name
          }
          
          fileTrnsfr.upload(uri,dest,options,true).then(
            (entry)=> {
              console.log("Uploaded");
      
              const alertS = this.alertCtrl.create({
      
                      title: "Upload Successful",
                      subTitle : "File Upload Success, url " + entry,
                      buttons:['Ok']
              });
      
              alertS.present();
              
            },
          (error) => {
      
              console.log("An error occured  " + error);
      
              const alertF = this.alertCtrl.create({
      
                title: "Upload Failed",
                subTitle : "File uploading failed :"+ dest + " from" + uri + " error : "+ JSON.stringify(error),
                buttons:['Ok']
              });
      
              alertF.present();
              
          }
        ); 
    });
  }
}
