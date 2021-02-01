import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any = {};


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.Register(this.model).subscribe(() => {
      console.log('registration succesfull');
    }, error => {
      console.log('registration failed');
    })
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
