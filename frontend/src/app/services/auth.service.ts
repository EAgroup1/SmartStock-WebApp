import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL_API='http://localhost:4000/api/users';

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  logIn(user){
    return this.http.post<any>(this.URL_API + '/logIn', user)
  }

  signUp(user){
    return this.http.post<any>(this.URL_API + '/signUp', user);
  }

  //we will check if the user logged in!
  loggedIn(){
    //if token exists return true if not return false 
    return !!localStorage.getItem('token')
  }

  //the function that it returns my token
  getToken() {
    return localStorage.getItem('token');
  }

  logOut(){
    //we delete the token of the user and we go to te logIn 'module'
    localStorage.removeItem('token');
    this.router.navigate(['/user/login'])
  }

}