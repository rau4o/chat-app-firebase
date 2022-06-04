import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupFormComponent} from './signup-form/signup-form.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {ChatFormComponent} from './chat-form/chat-form.component';
import {ChatRoomComponent} from './chat-room/chat-room.component';

const routes: Routes = [
  {
    path: 'signup', component: SignupFormComponent
  },
  {
    path: 'login', component: LoginFormComponent
  },
  {
    path: 'chat', component: ChatRoomComponent,
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
