import { Component } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  phrase: string = '';  
  userList$: Observable<User[]> = this.userService.all;
  accept: any;
  constructor(
    private userService: UserService,
  ) {
    this.accepted();
  }

  like: boolean = false;
  disconn: boolean = false;

  accepted(): void {
    this.userList$.subscribe(data => {
      this.accept = data
        .map(item => item)
        .filter(item => item.accepted && item.liked);
    },
      error => console.log(error))
  }

  disconnection(user: User): void {
    if (!confirm("Are you sure?")) {
      return;
    }
    this.disconn = true;

    this.userService.remove(user).then(
      resp => alert("Deleted"),
      err => alert(err.error)
    );
  }

}
