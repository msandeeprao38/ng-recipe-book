import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
    apiKey: 'AIzaSyANWFXUy1-xrBQ8GCw0MYtpk-QnnAub1Gs',
    authDomain: 'ng-recipe-book-25244.firebaseapp.com',
    });
  }

}
