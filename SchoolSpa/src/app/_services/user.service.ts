import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/user/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Users
  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>>{
    const paginatedResult : PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(userParams != null)
    {
      if(userParams.orderBy != null)
      params = params.append("orderBy", userParams.orderBy);

      if(userParams.searchBy != null)
      params = params.append("searchBy", userParams.searchBy);

      if(userParams.searchValue != null)
      params = params.append("searchValue", userParams.searchValue);

      if(userParams.reverseOrder != null)
      params = params.append("reverseOrder", userParams.reverseOrder);
    }


    return this.http.get<User[]>(this.baseUrl, {observe : 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if(response.headers.get('Pagination') != null){
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        })
      )
  }

  // Getting User By ID
  getUser(id: number): Observable<User>{
    return this.http.get<User>(this.baseUrl+id);
  }

  // Delete User by ID
  deleteUserById(id:number): Observable<User>{
    return this.http.delete<User>(this.baseUrl+id, this.httpOptions);
  }

  // Create User
  createUser(model: any): Observable<User>{
    return this.http.post<User>(this.baseUrl,model,this.httpOptions);
  }

  // Edit User
  editUser(id:number , model:any): Observable<User>{
    return this.http.put<User>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Users
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
