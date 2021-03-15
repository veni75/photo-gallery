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
  numberKey: number = 10;
  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new User());
  mylike: any;
  genderMale: any;
  genderFemale: any;
  myInterest: any;
  myLocation: any
  allUsersVar: boolean = false;
  likedUsersVar: boolean = true;
  maleUsersVar: boolean = false;
  femaleUsersVar: boolean = false;
  interestUsersVar: boolean = false;
  locationUsersVar: boolean = false;

  constructor(
    private userService: UserService,

  ) {
    this.myliked();
    this.myMale();
    this.myFemale();
    this.myInterestUsers();
    this.myLocationUsers();
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

  myInterestUsers(): void {
    this.userList$.subscribe(data => {
      this.myInterest = data
        .map(item => item)
        .filter(item => item.interests === "Angular");
    },
      error => console.log(error))
  }

  myLocationUsers(): void {
    this.userList$.subscribe(data => {
      this.myLocation = data
        .map(item => item)
        .filter(item => item.location === "Budapest");
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
