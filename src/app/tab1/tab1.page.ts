import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  userList$: Observable<any> = this.userService.all;
  like: boolean = false;
  dislike: boolean = false;
  phrase: string = '';
  
  filterKey: string = 'name';
  filterKeys: string[] = ['name', 'age', 'location', 'interests'];
  
  allUsersVar: boolean = false;
  likedUsersVar: boolean = true;
  maleUsersVar: boolean = false;
  femaleUsersVar: boolean = false;
  interestUsersVar: boolean = false;
  locationUsersVar: boolean = false;

  constructor(
    private userService: UserService,
  ) { }
  
  liked(user: User): void {
    this.userService.update(user).then(
      res => alert("You liked"),
      err => alert(err.error)
    );
  }

  disliked(user: User): void {
    if (!confirm("Are you sure?")) {
      return;
    }
    this.dislike = true;
    this.userService.remove(user).then(
      resp => alert("Deleted"),
      err => alert(err.error)
    );
  }

  setFalse(): void {
    this.allUsersVar = false;
    this.likedUsersVar = false;
    this.maleUsersVar = false;
    this.femaleUsersVar = false;
    this.interestUsersVar = false;
    this.locationUsersVar = false;
  }

  allUsers(): void {
    this.setFalse();
    this.allUsersVar = true;
  }
  likedUsers(): void {
    this.setFalse();
    this.likedUsersVar = true;
  }
  maleUsers(): void {
    this.setFalse();
    this.maleUsersVar = true;
  }
  femaleUsers(): void {
    this.setFalse();
    this.femaleUsersVar = true;
  }
  interestUsers(): void {
    this.setFalse();
    this.interestUsersVar = true;

  }
  locationUsers(): void {
    this.setFalse();
    this.locationUsersVar = true;

  }

}
