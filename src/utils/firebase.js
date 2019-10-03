import * as firebase from 'firebase';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyAblFffPoJTp4GX3J3NK968hjm9_95PU8k',
  authDomain: 'psedu-c19d1.firebaseapp.com',
  databaseURL: 'https://psedu-c19d1.firebaseio.com',
  projectId: 'psedu-c19d1',
  storageBucket: 'psedu-c19d1.appspot.com',
  messagingSenderId: '976897345430',
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
