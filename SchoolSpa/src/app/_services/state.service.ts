import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { State } from '../_models/state';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/state/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all States
  getStates(page?, itemsPerPage?, stateParams?): Observable<PaginatedResult<State[]>>{
    const paginatedResult : PaginatedResult<State[]> = new PaginatedResult<State[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(stateParams != null)
    {
      if(stateParams.orderBy != null)
      params = params.append("orderBy", stateParams.orderBy);

      if(stateParams.searchBy != null)
      params = params.append("searchBy", stateParams.searchBy);

      if(stateParams.searchValue != null)
      params = params.append("searchValue", stateParams.searchValue);

      if(stateParams.reverseOrder != null)
      params = params.append("reverseOrder", stateParams.reverseOrder);
    }


    return this.http.get<State[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting State By ID
  getState(id: number): Observable<State>{
    return this.http.get<State>(this.baseUrl+id);
  }

  // Delete State by ID
  deleteStateById(id:number): Observable<State>{
    return this.http.delete<State>(this.baseUrl+id, this.httpOptions);
  }

  // Create State
  createState(model: any): Observable<State>{
    return this.http.post<State>(this.baseUrl,model,this.httpOptions);
  }

  // Edit State
  editState(id:number , model:any): Observable<State>{
    return this.http.put<State>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting States
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
