import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import {MyMusicPage } from '../pages/my-music/my-music';
import {PlayerInterfacePage } from '../pages/player-interface/player-interface';
import { SearchPage } from "../pages/search/search";
import { HomePage } from "../pages/home/home";
import { UploadPage } from "../pages/upload/upload";
import { SongDetailsPage } from "../pages/song-details/song-details";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = UploadPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
