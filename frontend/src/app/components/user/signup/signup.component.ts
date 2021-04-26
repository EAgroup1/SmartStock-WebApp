import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
//only for this component we import AuthService component
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    username: '',
    password: '',
    role: ''
  }

  constructor(
    private authService: AuthService,
    //we use the router
    private router: Router) { }

  ngOnInit(): void {
  }

  /*resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

  onRegister(form?: NgForm){
    this.userService.postUser(form.value)
    .subscribe(res => {
      //after we reset the form
      this.resetForm(form);
      M.toast({html: 'User created succesfully!'})
    });
  }*/

  signUp(){
    //for the security of the community, we will not pass the params through console
    //console.log(this.user)
    this.authService.signUp(this.user).subscribe(
      res => {
        console.log(res)
        //when the user creates your account successfully, we save the token on the localStorage
        localStorage.setItem('token', res.token);
        this.router.navigate(['/user/profile']);
      },
      err => console.log(err)
      )
  }
}