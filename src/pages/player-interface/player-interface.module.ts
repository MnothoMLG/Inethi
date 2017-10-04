import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerInterfacePage } from './player-interface';

@NgModule({
  declarations: [
    PlayerInterfacePage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerInterfacePage),
  ],
})
export class PlayerInterfacePageModule {}
