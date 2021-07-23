import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Session } from '../_models/session';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/session/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Sessions
  getSessions(page?, itemsPerPage?, sessionParams?): Observable<PaginatedResult<Session[]>>{
    const paginatedResult : PaginatedResult<Session[]> = new PaginatedResult<Session[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(sessionParams != null)
    {
      if(sessionParams.orderBy != null)
      params = params.append("orderBy", sessionParams.orderBy);

      if(sessionParams.searchBy != null)
      params = params.append("searchBy", sessionParams.searchBy);

      if(sessionParams.searchValue != null)
      params = params.append("searchValue", sessionParams.searchValue);

      if(sessionParams.reverseOrder != null)
      params = params.append("reverseOrder", sessionParams.reverseOrder);
    }


    return this.http.get<Session[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Session By ID
  getSession(id: number): Observable<Session>{
    return this.http.get<Session>(this.baseUrl+id);
  }

  // Delete Session by ID
  deleteSessionById(id:number): Observable<Session>{
    return this.http.delete<Session>(this.baseUrl+id, this.httpOptions);
  }

  // Create Session
  createSession(model: any): Observable<Session>{
    return this.http.post<Session>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Session
  editSession(id:number , model:any): Observable<Session>{
    return this.http.put<Session>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Sessions
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
