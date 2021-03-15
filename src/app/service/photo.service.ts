import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource, Camera } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public photos: Photo[] = [];
  private photos$ = new BehaviorSubject<Photo[]>([]);
  
  getPhotos(): Observable<Photo[]> {
    return this.photos$.asObservable();
  }

  setPhotos(photos: Photo[]) {
    this.photos$.next(photos);
}

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });
   
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });

    this.setPhotos(this.photos);
  }

}
export interface Photo {
  filepath: string;
  webviewPath: string;
}
