import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Photo, PhotoService } from '../service/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public photos: Photo[] = [];
  userList$: Observable<User[]> = this.userService.all;
  //user1$: Observable<User> = this.userService.get(1);
  updating: boolean = false;

  constructor(
    private userService: UserService,
    public photoService: PhotoService,
    private router: Router
  ) { }

  
  async addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.photoService.getPhotos().subscribe(photos => this.photos = photos);
  }

  onUpdate(form:NgForm,user: User): void {
    this.updating = true;
    this.userService.update(user).then(
      resp => location.reload(),
      err => alert(err.error)
    );
  }

}
