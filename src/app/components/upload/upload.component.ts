import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { UploadImagesService } from 'src/app/services/upload-images.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: [
  ]
})
export class UploadComponent implements OnInit {

  files: FileItem[] = [];

  constructor(
    private _uploadService: UploadImagesService
  ) { }

  ngOnInit(): void {
  }

  uploadImg() {
    this._uploadService.uploadImgForebase(this.files);
  }

}
