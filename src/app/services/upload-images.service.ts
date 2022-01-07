import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/storage';
import { FileItem } from '../models/file-item';

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

  uploadImgForebase(images: FileItem[]) {

    // referencia al storage de firebase
    const storageRef = firebase.storage().ref();

    for (const item of images) {
      item.isUploading = true;

      // le decimos si el progreso llego a 100 que continue o salga
      if (item.progress >= 100) {
        continue;
      }

      // hacemos la ref al storage diciendole donde estara guardado el file
      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.DIR_IMG}/${item.archiveName}`).put(item.archive);

      // ejecutamos la tarea de subida
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        // callback que indica el progreso del item
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,

        // en caso que tengamos error
        (error) => console.error('upload error', error),

        // callback cuando todo lo hace correctamente
        () => {
          console.log('Image is upload ok.');
          uploadTask.snapshot.ref.getDownloadURL().then(res => {
            item.url = res;
            // guardamos la ref de la imagen en la bd
            this.saveImg({ name: item.archiveName, url: item.url });
          });
          item.isUploading = false;
        }
      )

    }
  }
}
