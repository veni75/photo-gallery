import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { ConnectionService } from '../service/connection.service';
import { ProfileCardComponent } from 'src/app/common/profile-card/profile-card.component';
import { Connection } from '../model/connection';

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
  numberKey: number = 10;
  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new User());
  mylike: any;
  genderMale: any;
  genderFemale: any;
  allUsersVar: boolean = false;
  likedUsersVar: boolean = false;
  maleUsersVar: boolean = false;
  femaleUsersVar: boolean = false;

  constructor(
    private userService: UserService,

  ) {
    this.myliked();
    this.myMale();
    this.myFemale();
  }

  myliked(): void {
    this.userList$.subscribe(data => {
      this.mylike = data
        .map(item => item)
        .filter(item => item.liked);
    },
      error => console.log(error))
  }

  myMale(): void {
    this.userList$.subscribe(data => {
      this.genderMale = data
        .map(item => item)
        .filter(item => item.gender === "male");
    },
      error => console.log(error))
  }

  myFemale(): void {
    this.userList$.subscribe(data => {
      this.genderFemale = data
        .map(item => item)
        .filter(item => item.gender === "female");
    },
      error => console.log(error))
  }

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

  allUsers(): void {
    this.allUsersVar = true;
    this.likedUsersVar = false;
    this.maleUsersVar = false;
    this.femaleUsersVar = false;
  }
  likedUsers(): void {
    this.likedUsersVar = true;
    this.allUsersVar = false;
    this.maleUsersVar = false;
    this.femaleUsersVar = false;
  }
  maleUsers(): void {
    this.maleUsersVar = true;
    this.allUsersVar = false;
    this.likedUsersVar = false;
    this.femaleUsersVar = false;
  }
  femaleUsers(): void {
    this.femaleUsersVar = true;
    this.allUsersVar = false;
    this.likedUsersVar = false;
    this.maleUsersVar = false;
  }

}
