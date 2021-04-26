import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//we import all our services then we initialize them to use on providers point
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  //we put on the constructor private variable of the service that we will use
  constructor(
    private authService: AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {}

  logIn(){
    this.authService.logIn(this.user).subscribe(
      res => {
        console.log(res)
        //we use localStorage to save the login token
        localStorage.setItem('token', res.token);
        this.router.navigate(['/user/profile']);
      },
      err => console.log(err)
    )
  }
}
