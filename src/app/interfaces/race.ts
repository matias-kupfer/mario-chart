import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;


export interface Race {
  date: Timestamp,
  first: string,
  second: string,
  third: string,
  fourth: string,
  createdBy: string,
}
