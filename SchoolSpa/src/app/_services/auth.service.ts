import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "https://localhost:5001/api/auth/";
  jwtHelper = new JwtHelperService();
  decodedToken : any;
  token : any;

  constructor(
    private http: HttpClient, 
    private _userService: UserService, 
    private router: Router,
    ) 
    { }

  // Login method
  login(model:any){
    return this.http.post(this.baseUrl +'login', model).pipe(
      map((response:any) => {
        const user = response;
        if(user){
          localStorage.setItem('token',user.token);
          this.token = user.token;
          var decode = this.jwtHelper.decodeToken(user.token);
        }
      })
    )
  }

  // Register method
  register(model:any) : Observable<User>{
    return this.http.post<User>(this.baseUrl + 'register', model);
  }

  // Checking if token is valid or not
  checkToken(token :string) : Observable<any>{
    return this.http.post(this.baseUrl+"checktoken", token);
  }

  // Check if user is logged in
  loggedIn(){
    const token = localStorage.getItem('token');
    if(token) return !this.jwtHelper.isTokenExpired(token);
    else return false;
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }

  getAuthInformation(){
    var token = localStorage.getItem('token');
    if(token != null)
    this.decodedToken = this.jwtHelper.decodeToken(token);
    console.log(this.decodedToken);
  }


  // Checking wether the user has the privilege or not
  userHasPrivilege(privilege : string){
    let params = new HttpParams();
    params = params.append("id", this.decodedToken.nameid);
    params = params.append("privilege", privilege);
    return this.http.get(this.baseUrl+"user-privilege-check", {observe : 'response', params}).pipe(
      map(response => {
        return response.body;
      })
    );
  }


  // Checking privilege from user claims
  checkUserPrivilege(privilege : string){
    if(this.decodedToken != null){
      if(this.decodedToken.role != null){
        for(const priv of this.decodedToken.Privileges){
          if(priv == privilege){
            return true;
          }
        }
        return false
      }
      else{
        console.log("this user has no role");
        return false
      }
    }
    else{
      console.log("the user is logged out");
      return false
    }
  }

}
