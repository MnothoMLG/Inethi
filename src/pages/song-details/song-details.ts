import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
//import { AlertController } from "ionic-audio/node_modules/ionic-angular";
/**
 * Generated class for the SongDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-song-details',
  templateUrl: 'song-details.html',
})
export class SongDetailsPage {
  file_as_string_2: any;
  file_as_string: string;
  filename: string;
  path: string;
  resolved_path: string;
  genre: any;
  tags: any;
  song_description: any;
  song_title: any;
  file_to_upload: any;

  constructor(private fPath: FilePath,private file: File, public navCtrl: NavController, public navParams: NavParams, private data_prov : DataProvider) {


    this.file_to_upload  = this.navParams.get('file_to_upload');
    //this.file_to_upload = "Still to be edited";
    this.resolve_file_path();
  }

 //convert the content url into a native file path
  resolve_file_path()
  {
    this.fPath.resolveNativePath(this.file_to_upload)
    .then(filePath => {
      console.log(filePath);
      this.resolved_path = filePath;

      this.filename = this.resolved_path.substr(this.resolved_path.lastIndexOf('/') + 1);
      this.path = this.resolved_path.substr(0,this.resolved_path.lastIndexOf('/'));
    
    })
    .catch(err => console.log(err));


  
  }

  process_upload()
  {
    
      //having edited all the fields... the song is then uploaded 
      // this.file_as_string_2 = cordova.file.readAsBinaryString(this.path, this.filename).then(data =>{

      //   this.file_as_string = data;
        

      // });
      if (this.data_prov.upload_file(this.resolved_path, "upload",this.song_title)) //upload returns true on success
        {
            let song_record = {
              title : this.song_title,
              description : this.song_description,
              tags : this.tags,
              genre: this.genre,
              src : "/music/"+this.song_title+".mp3"
            };

            //do an insert into the dB
            this.data_prov.record_song_entry(song_record); 

        }

     
      //this.file.readAsBinaryString(,);
      
      //if upload successful... insert entries
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongDetailsPage');
  }

}
