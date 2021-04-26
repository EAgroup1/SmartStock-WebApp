import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

//we import the authService for getToken function!
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

//this service works for the format of the token (Bearer 'token')
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private authService: AuthService
  ) { }

  //we make a header in each request
  intercept(req, next){
    const tokenizeReq = req.clone({
      setHeaders: {
        //in each request adds Authorization Header that contains the value of the token
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  }
}
