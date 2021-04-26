import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

//we don't need the observable
//import { Observable } from 'rxjs';

//we import the component about auth service
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

//the class AuthGuard is a way to protect the routes in the frontend
//this consists to see a token or not
export class AuthGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean{
    if(this.authService.loggedIn()){
      return true;
    }
    //if it's false the user navigates in the logIn
    this.router.navigate(['/user/login'])
  }
  
}
