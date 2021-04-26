import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//Angular CLI automatically manages the creation of components, models and services
import { UsersComponent } from './components/admin/users/users.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

//we add some components for WebApp
import { HomeComponent } from './components/home/home.component';
import { PremiumComponent } from './components/premium/premium.component';
import { SupportComponent } from './components/support/support.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';

//services API
import { UserService } from './services/user.service';

//routes
import { AppRoutingModule } from './app.routing';
import { AuthorizationComponent } from './components/admin/authorization/authorization.component';

import { AuthGuard } from './services/auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { FriendsComponent } from './components/user/friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    PremiumComponent,
    SupportComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    Page404Component,
    AuthorizationComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  //providers: [UserService]
  //we make in each request a extra header with Authorization header! (Big important!)
  providers: [
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
