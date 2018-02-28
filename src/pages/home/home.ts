import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/pages/home/home.scss']
})
export class HomePage {

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, private mediaProvider: MediaProvider) {

  }
  ionViewDidLoad() {
    //this.mediaProvider.getAllLikes();
  }
}
