import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UploadPage } from "../upload/upload";
import { FileChooser } from "@ionic-native/file-chooser";

/**
 * Generated class for the RecordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {

  constructor(private fileChooser: FileChooser ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Record');
  }

  choose_file()
  {
    this.fileChooser.open()
    .then(uri => console.log(uri))
    .catch(e => console.log(e));
  }

  pushPage(){
     // push another page on to the navigation stack
     // causing the nav controller to transition to the new page
     // optional data can also be passed to the pushed page.
    // this.navCtrl.push(Add_Info);
   }

   go_back(){
      // push another page on to the navigation stack
      // causing the nav controller to transition to the new page
      // optional data can also be passed to the pushed page.
      this.navCtrl.push(UploadPage);
    }

}
