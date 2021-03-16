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

  constructor(
    private userService: UserService,
  ) { }

  like: boolean = false;
  disconn: boolean = false;

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
