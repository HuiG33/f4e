import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.response = navParams.get('response');
    this.searchTag = this.navParams.get('searchTag');
    this.thing = this.navParams.get('thing');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchedeventsPage');
    console.log(this.thing);
    //console.log(this.response);
    //console.log(this.searchTag);

  }

}
