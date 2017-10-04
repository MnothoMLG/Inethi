import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AlertController } from "ionic-audio/node_modules/ionic-angular";
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import {LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import {StreamingMedia} from '@ionic-native/streaming-media';
import { UploadPage } from '../pages/upload/upload';
import {MyMusicPage } from '../pages/my-music/my-music';
import {PlayerInterfacePage } from '../pages/player-interface/player-interface';
import {IonicAudioModule} from 'ionic-audio';
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

//HTTP Module
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';


import { FileChooser } from '@ionic-native/file-chooser';
//the progress bar component for music streamin
import {ProgressBarComponent} from '../components/progress-bar/progress-bar';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { RecordPage } from "../pages/record/record";
import { SongDetailsPage } from "../pages/song-details/song-details";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    SearchPage,
    ProgressBarComponent,
    LoginPage,
    RegisterPage,
    UploadPage,
    MyMusicPage,
    PlayerInterfacePage,
    RecordPage,
    SongDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    IonicAudioModule.forRoot(),
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top',tabsHideOnSubPages: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    SearchPage,
    LoginPage,
    RegisterPage,
    UploadPage,
    MyMusicPage,
    PlayerInterfacePage,
    RecordPage,
    SongDetailsPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StreamingMedia,
    FileChooser, 
    DataProvider,FilePath,
    File,AlertController,
    Transfer, TransferObject
    
  ]
})
export class AppModule {}
