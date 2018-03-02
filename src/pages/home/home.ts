import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {EventPage} from '../event/event';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/pages/home/home.scss']
})
export class HomePage {

  latestImgsArray: any;

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, private mediaProvider: MediaProvider) {

  }

  ionViewDidLoad(){
    this.mediaProvider.get5LatestImages().subscribe(response => {
      console.log(response);
      this.latestImgsArray = response;
    });
  }

  itemTapped(event, file_id, title, description, user_id, filename, time_added) {
    this.navCtrl.push(EventPage, {
      file_id: file_id,
      title: title,
      description: description,
      user_id: user_id,
      filename: filename,
      time_added: time_added
    });
  }

}
