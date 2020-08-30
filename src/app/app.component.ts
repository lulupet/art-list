import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: "AIzaSyD7twY2RXOWzjh1d006xgZgbZaQoPxFA0w",
      authDomain: "art-list-cbffd.firebaseapp.com",
      databaseURL: "https://art-list-cbffd.firebaseio.com",
      projectId: "art-list-cbffd",
      storageBucket: "art-list-cbffd.appspot.com",
      messagingSenderId: "1017020348053",
      appId: "1:1017020348053:web:bef7d9e077e73a0dba8d9c"
    };
    firebase.initializeApp(config);
  }
}
