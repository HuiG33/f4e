import {Component} from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  ToastController,
} from 'ionic-angular';
import {HttpErrorResponse} from '@angular/common/http';
import {MediaProvider} from '../../providers/media/media';
import {UpdateUser} from '../../interfaces/updateUser';
import {ProfilePage} from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  updateUser: UpdateUser = {
    token: localStorage.getItem('token'),
  };

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider, public toastCtrl: ToastController) {
  }

  updateData() {
    this.mediaProvider.updateUserData(this.updateUser).subscribe(response => {
      console.log(response);
      this.mediaProvider.username = this.updateUser.username;
      this.mediaProvider.password = this.updateUser.password;
      this.navCtrl.setRoot(ProfilePage);
      this.success();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  success() {
    let toast = this.toastCtrl.create({
      message: 'Updated successfully',
      duration: 3000,
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');

  }
}
