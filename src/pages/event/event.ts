import {Component} from '@angular/core';
import {
  ActionSheetController, IonicPage, NavController,
  NavParams,
} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {CommentsPage} from '../comments/comments';
import {ViewprofilePage} from '../viewprofile/viewprofile';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  fileID: number;
  title: string;
  description: string;
  userID: any;
  userName: any;
  fileName: any;
  timeAdded: any;
  likes: any;
  likeamount: any;
  comments: any;
  commentsAmount: any;
  isLiked: boolean = false;
  likesArray: any;
  userWhoPostedEmail: string;
  count: number;
  loggedUserId: number;
  likeIdArray: Array<{ favourite_id: number, file_id: number, user_id: number }> = [];
  signedLength: number;
  signedUser: string;
  signedUserId: number;
  signedUserEmail: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider,
    public actCtrl: ActionSheetController) {
    this.fileID = navParams.get('file_id');
    this.title = this.navParams.get('title');
    this.description = this.navParams.get('description');
    this.userID = this.navParams.get('user_id');
    this.fileName = this.navParams.get('filename');
    this.timeAdded = this.navParams.get('time_added');
  }

  getUsernameByUserID() {
    this.mediaProvider.getUsernameByUserId(this.userID).subscribe(response => {
      //console.log(response);
      this.userName = response['username'];
      this.userWhoPostedEmail = response['email'];
    });
  }

  getLikesByFileID() {
    this.mediaProvider.getLikesByFileId(this.fileID).subscribe(response => {
      //console.log(response);
      this.likes = response;
      this.likeamount = this.likes.length;
      console.log(this.likes);
    });
  }

  checkIfLiked() {
    this.mediaProvider.getLikesByFileId(this.fileID).subscribe(response => {
      this.likesArray = response;
      this.likesArray.forEach(data => {
        if (data.user_id == this.userID) {
          this.isLiked = true;
        }
      });
    });
  }

  getCommentsAmountByFileId() {
    this.mediaProvider.getCommentsByFileId(this.fileID).subscribe(response => {
      //console.log(response);
      this.comments = response;
      this.commentsAmount = this.comments.length;
    });
  }

  showUsersSigned() {
    let actionsheet = this.actCtrl.create({
      title: 'Signed users',
    });
    this.mediaProvider.getLikesByFileId(this.fileID).subscribe(response => {
      //console.log(response);
      this.likes = response;
      console.log(this.likes);
      this.likes = response;
      this.likes.map(like => {
        const userID = like.user_id;
        this.mediaProvider.getUsernameByUserId(userID).subscribe(response => {
          console.log(response);
          let button = {
            text: response['username'],
            handler: () => {
              this.navCtrl.push(ViewprofilePage, {
                email: response['email'],
                username: response['username'],
                user_id: response['user_id'],
              });
            },
          };
          actionsheet.addButton(button);
        });
      })


    });

    actionsheet.present();
  }

  redirectToUserThatPosted() {
    this.navCtrl.push(ViewprofilePage, {
      username: this.userName,
      user_id: this.userID,
      email: this.userWhoPostedEmail,
    });
  }

  like() {
    this.mediaProvider.like(this.fileID).subscribe(response => {
      console.log(response);
      this.isLiked = true;
      this.navCtrl.last()._didLoad();
    });
  }

  unlike() {
    this.mediaProvider.unLike(this.fileID).subscribe(response => {
      console.log(response);
      this.isLiked = false;
      this.navCtrl.last()._didLoad();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    this.mediaProvider.getUserData().subscribe(response => {
      console.log(response);
      this.loggedUserId = response['user_id'];
      console.log(this.loggedUserId);
    });
    //console.log(this.fileID);
    //console.log(this.title);
    //console.log(this.description);
    //console.log(this.userID);
    //console.log(this.fileName);
    this.getUsernameByUserID();
    this.getLikesByFileID();
    this.getCommentsAmountByFileId();
    this.checkIfLiked();
  }

  itemTapped(event) {
    this.navCtrl.push(CommentsPage, {
      file_id: this.fileID,
    });
  }

}
