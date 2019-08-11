import { Injectable } from '@angular/core';
import {UploadFileService} from '../2.UploadFile/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private uploadfile: UploadFileService) { }

}
