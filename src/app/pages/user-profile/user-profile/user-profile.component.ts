import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfileFetchAction } from 'src/app/ngrx-manage/profile/profile.actions';
import { getUserProfileStateData } from 'src/app/ngrx-manage/profile/profile.selector';
import { IUserProfile } from 'src/app/ngrx-manage/profile/profile.state';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  $userProfile: Observable<IUserProfile>;

  constructor(
    private store: Store
  ) {
    this.$userProfile = this.store.select(getUserProfileStateData)
  }

  ngOnInit(): void {
    this.store.dispatch(new UserProfileFetchAction());
  }

}
