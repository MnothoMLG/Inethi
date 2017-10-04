import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { RecordPage } from "../record/record";
import { AlertController } from "ionic-audio/node_modules/ionic-angular";
import { SongDetailsPage } from "../song-details/song-details";
import { DataProvider } from "../../providers/data/data";

/**
 * Generated class for the UploadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  choosen_file: string;

  constructor(private data: DataProvider,private fileChooser: FileChooser,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadTwo');
  }

  choose_file()
  {
    this.fileChooser.open()
    .then(uri => {
      this.choosen_file = uri;
      console.log(uri);

      this.edit_details(uri); //got to edit the tags before proceeding to upload             
            
    }).catch(e =>{ console.log(e);  this.edit_details("Error choosing file");});
  }
  pushPage(){
     // push another page on to the navigation stack
     // causing the nav controller to transition to the new page
     // optional data can also be passed to the pushed page.
     this.navCtrl.push(RecordPage);
   }

   edit_details(chosen_file)
   {
     this.navCtrl.push(SongDetailsPage,{
      file_to_upload: chosen_file
       }); //after you have chosen your file

  
   }


}