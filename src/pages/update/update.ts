import {Component} from '@angular/core';
import {
  AlertController,
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

  confirmPass: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider, public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
  }

  updateData() {
    if (this.confirmPass == this.updateUser.password) {
      this.mediaProvider.updateUserData(this.updateUser).subscribe(response => {
        console.log(response);
        //this.mediaProvider.username = this.updateUser.username;
        //this.mediaProvider.password = this.updateUser.password;
        this.navCtrl.setRoot(ProfilePage);
        this.success();
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }
    else {
      this.showAlert();
    }
  }

  success() {
    let toast = this.toastCtrl.create({
      message: 'Updated successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Passwords does not match!',
      buttons: ['OK'],
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
    console.log(this.mediaProvider.password);
  }
}
