import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {CommentsPage} from '../comments/comments';

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
  isLiked: boolean = true;
  likesArray: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
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
    });
  }

  getLikesByFileID() {
    this.mediaProvider.getLikesByFileId(this.fileID).subscribe(response => {
      //console.log(response);
      this.likes = response;
      this.likeamount = this.likes.length;
    });
  }

  checkIfLiked() {
    this.mediaProvider.getAllLikes().subscribe(response => {
      this.likesArray = response;
      this.likesArray.forEach(data => {
        if(data.file_id == this.fileID){
          this.isLiked = true;
        }
        else {
          this.isLiked = false;
        }
      });
    });
    console.log(this.isLiked);
  }

  getCommentsAmountByFileId() {
    this.mediaProvider.getCommentsByFileId(this.fileID).subscribe(response => {
      //console.log(response);
      this.comments = response;
      this.commentsAmount = this.comments.length;
    });
  }

  ionViewDidLoad() {
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
