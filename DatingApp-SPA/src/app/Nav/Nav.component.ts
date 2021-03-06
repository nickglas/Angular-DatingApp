import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  Login() {
    this.authService.Login(this.model).subscribe(next => {
      this.alertify.success("logged in succesfully");
      this.router.navigate(['/members']);
    }, error => {
      this.alertify.error(error);
    }
    );
  }
  LoggedIn() {
    return this.authService.loggedIn();
  }
  Logout() {
    localStorage.removeItem("token");
    this.alertify.message("Logged out");
    this.router.navigate(['/home']);
  }
}
