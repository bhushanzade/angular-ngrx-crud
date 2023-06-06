import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IAuthUser } from 'src/app/ngrx-manage/app/app.state';
import { Store } from '@ngrx/store';
import { getUserData } from 'src/app/ngrx-manage/app/app.selector';
import { UserDataAction } from 'src/app/ngrx-manage/app/app.action';
import { LogoutInilizeAction } from 'src/app/ngrx-manage/logout/logout.actions';
import { getLogoutStateData } from 'src/app/ngrx-manage/logout/logout.selector';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  $userdata: Observable<IAuthUser>

  constructor(private store: Store) {
    this.$userdata = this.store.select(getUserData);
  }

  ngOnInit(): void {
  }

  onClickLogout(): void {
    this.store.dispatch(new LogoutInilizeAction(true));
  }

}
