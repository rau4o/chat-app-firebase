import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  public email: string;
  public password: string;
  public displayName: string;
  public errorMessage: string;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  public signUp(): void {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService.signUp(email, password, displayName)
      .then(resolve => this.router.navigate(['chat']))
      .catch(error => this.errorMessage = error.message);
  }

}
