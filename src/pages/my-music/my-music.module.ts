import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyMusicPage } from './my-music';

@NgModule({
  declarations: [
    MyMusicPage,
  ],
  imports: [
    IonicPageModule.forChild(MyMusicPage),
  ],
})
export class MyMusicPageModule {}
