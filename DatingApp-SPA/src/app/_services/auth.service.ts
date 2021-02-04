import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseurl = "http://localhost:5000/api/auth/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {

  }

  Login(model: any) {
    return this.http.post(this.baseurl + "login", model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
          }
        })
      );
  }
  Register(model: any) {
    return this.http.post(this.baseurl + "register", model);
  }
  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
}
