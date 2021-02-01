import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = "http://localhost:5000/api/auth/";
  constructor(private http: HttpClient) {

  }

  Login(model: any) {
    return this.http.post(this.baseurl + "login", model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
          }
        })
      );
  }
  Register(model: any) {
    return this.http.post(this.baseurl + "register", model);
  }
}
