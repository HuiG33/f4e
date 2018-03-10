import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {EventPage} from '../event/event';
import {Media} from '../../interfaces/media';
import {Search} from '../../interfaces/search';
import {LoginPage} from '../login/login';
import {SearchedeventsPage} from '../searchedevents/searchedevents';
import {Searchtag} from '../../interfaces/searchtag';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/pages/home/home.scss'],
})
export class HomePage {

  latestImgsArray: any;
  searchedImgsArray: any;
  searchedImgsId: any;
  oneMoreArray = [];
  file: any;

  media: Media = {
    title: '',
    description: '',
  };

  search: Search = {
    title: '',
  };

  searchTag: Searchtag = {
    tag: '',
  };

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(
    public navCtrl: NavController, private mediaProvider: MediaProvider,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }

  /*
    searchEvent() {
      this.mediaProvider.searchMedia(this.search).subscribe(response => {
        this.searchedImgsArray = response;

        this.searchedImgsArray.map(search => {
          const fileId = search.file_id;
  // 1. kaikki yläpuolella tapahtuu, mut sit hyppää tonne alas kohtaan 2.
  // 3. miten saan tästä alas päin, kohtaan 4.
          this.mediaProvider.tagsByFileId(fileId).subscribe(response => {
            this.searchedImgsId = response;

            this.searchedImgsId.map(file => {
              const files = file.tag;
              if (files == 'event'){
                this.oneMoreArray.push(file.file_id);
              }
            });
          });
        });
  // 4. nämä tapahtumaan ennen kuin 2. tapahtuu
  // 2. eli hyppää tänne
        console.log(this.oneMoreArray.length);
      });
      this.showAlert();
    }
  */

  searchEvent() {
    this.mediaProvider.searchMedia(this.search).subscribe(response => {
      this.searchedImgsArray = response;
      console.log(this.searchedImgsArray);
      this.navCtrl.push(SearchedeventsPage, {
        thing: this.searchedImgsArray
      });
    });
  }

  searchEventByTag(tag) {
    this.mediaProvider.searchTag('event').subscribe(response => {
      //console.log(response);
      this.navCtrl.push(SearchedeventsPage, {
        response: response,
        searchTag: this.searchTag.tag,
      });
    });
  }

  ionViewDidLoad() {
    this.mediaProvider.get5LatestImages().subscribe(response => {
      console.log(response);
      this.latestImgsArray = response;
    });
    if (localStorage.getItem('token') != null) {
      this.mediaProvider.logged = true;
    }
  }

  itemTapped(
    event, file_id, title, description, user_id, filename, time_added) {
    if (localStorage.getItem('token') != null) {
      this.navCtrl.push(EventPage, {
        file_id: file_id,
        title: title,
        description: description,
        user_id: user_id,
        filename: filename,
        time_added: time_added,
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
