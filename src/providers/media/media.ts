import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HomePage} from '../../pages/home/home';
import {App} from 'ionic-angular';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  username: string;
  password: string;
  status: string;
  isLiked: boolean;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  nav = this.app.getActiveNav();

  constructor(private http: HttpClient, public app: App) {
  }

  public login() {
    console.log('uname: ' + this.username);
    console.log('pwd: ' + this.password);

    const body = {
      username: this.username,
      password: this.password,
    };

    // this is optional
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    this.http.post(this.apiUrl + '/login', body, settings).
      subscribe(response => {
        console.log(response['token']);
        localStorage.setItem('token', response['token']);
        //this.router.navigate(['front']);
        this.nav.setRoot(HomePage);
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.status = error.error.message;
      });
  }

  register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };

    return this.http.get(this.apiUrl + '/users/user',
      settings);
  }

  getUploadData(formData) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };

    return this.http.post(this.apiUrl + '/media', formData,
      settings);
  }

  getNewFiles() {
    return this.http.get(this.apiUrl + '/media?start=&limit=10');
  }

  get5LatestImages(){
    return this.http.get(this.apiUrl + '/media?start=0&limit=5');
  }

  getUsernameByUserId(userId) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get('http://media.mw.metropolia.fi/wbma/users/' + userId,
      settings);
  }

  commentEvent(comment) {
    console.log(comment);
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.post(this.apiUrl + '/comments', comment, settings);
  }

  getCommentsByFileId(fileId) {
    return this.http.get(this.apiUrl + '/comments/file/' + fileId);
  }

  like(file_id: number) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };

    const body = {
      file_id: file_id,
    };

    this.http.post(this.apiUrl + '/favourites', body, settings).
      subscribe(response => {
        console.log(response);
        this.isLiked = true;
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
      });
  }

  unLike(file_id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    this.http.delete(this.apiUrl + '/favourites/file/' + file_id, settings).
      subscribe(response => {
        console.log(response);
        this.isLiked = false;
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
      });
  }

  getLikesByFileId(fileid) {
    return this.http.get(this.apiUrl + '/favourites/file/' + fileid);
  }

  getAllLikes() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/favourites', settings);
  }

  postTag(tag) {
    console.log(tag);
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.post(this.apiUrl + '/tags', tag, settings);
  }

  getFileWithSpecificTag(tag) {
    return this.http.get(this.apiUrl + '/tags/' + tag);
  }


  deleteTag(tag_id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    this.http.delete(this.apiUrl + '/tags/' + tag_id, settings);
  }

  getTags() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/tags', settings);
  }

}
