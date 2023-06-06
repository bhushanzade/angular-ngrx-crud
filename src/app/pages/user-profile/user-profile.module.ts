import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileEffect } from 'src/app/ngrx-manage/profile/profile.effects';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  }
]

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([UserProfileEffect])
  ]
})
export class UserProfileModule { }
