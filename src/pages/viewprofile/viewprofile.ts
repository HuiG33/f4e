import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewprofile',
  templateUrl: 'viewprofile.html',
})
export class ViewprofilePage {

  userId: number;
  userName: string;
  userEmail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userName = this.navParams.get('username');
    this.userEmail = this.navParams.get('email');
    this.userId = this.navParams.get('user_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewprofilePage');
    console.log(this.userEmail);
    console.log(this.userName);
    console.log(this.userId);
  }

}
