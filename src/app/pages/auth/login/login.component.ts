import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ILogin, InitialLoginState } from 'src/app/ngrx-manage/login/login';
import { Login } from 'src/app/ngrx-manage/login/login.actions';
import { getLoginStateData } from 'src/app/ngrx-manage/login/login.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: ILogin = {
    email: '',
    password: ''
  };
  returnUrl: string = '';

  constructor(
    private store: Store<InitialLoginState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') as string;
  }

  ngOnInit(): void { }

  login(): void {
    this.store.dispatch(new Login({ ...this.model }))
    // this.store.dispatch(LoginActionStart(this.model))
    this.store.select(getLoginStateData).subscribe(res => {
      if (res && res.data) {
        const url = this.returnUrl || '/home';
        this.router.navigateByUrl(url);
      }
    })
  }

}
