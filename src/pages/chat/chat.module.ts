import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(ChatPage),
  ],
})
export class ChatPageModule {}
