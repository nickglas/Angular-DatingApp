import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  Login() {
    this.authService.Login(this.model).subscribe(next => {
      console.log("logged in succesfully");
    }, error => {
      console.log("Failed to log in");
    }
    );
  }
  LoggedIn() {
    const token = localStorage.getItem("token");
    return !!token;
  }
  Logout() {
    localStorage.removeItem("token");
    console.log("Logged out");
  }
}
