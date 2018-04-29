import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglePage } from './single';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    SinglePage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(SinglePage),
  ],
})
export class SinglePageModule {}
