import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { SearchPage } from '../search/search';
import {UploadPage } from '../upload/upload';
import {MyMusicPage } from '../my-music/my-music';
import { NavParams, NavController } from "ionic-angular";
import { PlayerInterfacePage } from "../player-interface/player-interface";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = MyMusicPage;
  tab4Root = UploadPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  public allow_page_through(thePage, passed_in)
  {
    this.navCtrl.push(thePage, {
      param1: passed_in
    });
  }

}
