import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginPage} from '../login/login';
import {Media} from '../../interfaces/media';
import {ListPage} from '../list/list';
import {Tags} from '../../interfaces/tags';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  file: File;
  picData: any;
  userData: any;
  userName: string;
  userEmail: string;
  fullName: string;

  media: Media = {
    title: '',
    description: ''
  };

  tag: Tags = {
    file_id: null,
    tag: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
    //this.userName = navParams.get('username');
    //this.userEmail = navParams.get('email');
    //this.fullName = navParams.get('full_name');
  }

  getUserInformation(){
    this.mediaProvider.getUserData().subscribe( response => {
      console.log(response);
      this.userName = response['username'];
    });
    this.mediaProvider.getUserData().subscribe( response => {
      console.log(response);
      this.userEmail = response['email'];
    });
    this.mediaProvider.getUserData().subscribe( response => {
      console.log(response);
      this.fullName = response['full_name'];
    });
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  startUpload() {
    console.log(this.media);
    // create FormData-object
    const formData = new FormData();
    // add title and description to FormData-object
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    // add file to FormData-object
    formData.append('file', this.file);
    // send FormData object to API
    this.mediaProvider.getUploadData(formData).subscribe(response => {
      console.log(response);
      this.navCtrl.setRoot(ListPage);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  uploadProfilePic() {
    console.log(this.media);
    // create FormData-object
    const formData = new FormData();
    // add title and description to FormData-object
    formData.append('title', 'profilepic');
    formData.append('description', 'profilepic');
    // add file to FormData-object
    formData.append('file', this.file);
    // send FormData object to API
    this.mediaProvider.getUploadData(formData).subscribe(response => {
      this.picData = response;
      this.tag.file_id = this.picData.file_id;
      console.log(this.tag.file_id);
      this.mediaProvider.getUserData().subscribe(response => {
        this.userData = response;
        this.tag.tag = this.userData.username;
        this.mediaProvider.postTag(this.tag).subscribe(response => {
          console.log(response);
        });
      });
      this.navCtrl.setRoot(ListPage);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

/*
  postNewTag() {
    this.mediaProvider.postTag(this.tag).subscribe(response => {
      console.log(response);
    });
  }
*/


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    if (localStorage.getItem('token') == null) {
        //this.router.navigate(['front']);
        this.navCtrl.setRoot(LoginPage);
    }
    this.getUserInformation();
  }

}
