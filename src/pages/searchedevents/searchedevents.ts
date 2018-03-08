import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';

/**
 * Generated class for the SearchedeventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchedevents',
  templateUrl: 'searchedevents.html',
})
export class SearchedeventsPage {

  response: any;
  searchTag: any;
  thing: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
    this.response = navParams.get('response');
    this.searchTag = this.navParams.get('searchTag');
    this.thing = this.navParams.get('thing');
  }

  getFiles() {
    this.thing.forEach(data => {
      this.mediaProvider.getFileById(data).subscribe(response => {
        console.log(response);
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchedeventsPage');
    console.log(this.thing);
    //console.log(this.response);
    //console.log(this.searchTag);
    //this.getFiles();
  }
}
