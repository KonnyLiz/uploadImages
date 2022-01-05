import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  private DIR_IMG = 'img';

  constructor(
    private db: AngularFirestore
  ) { }

  private saveImg(imagen: { name: string, url: string }) {
    this.db.collection(`/${this.DIR_IMG}`).add(imagen);
  }
}
