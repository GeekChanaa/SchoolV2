import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Timezone } from '../_models/timezone';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/timezone/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Timezones
  getTimezones(page?, itemsPerPage?, timezoneParams?): Observable<PaginatedResult<Timezone[]>>{
    const paginatedResult : PaginatedResult<Timezone[]> = new PaginatedResult<Timezone[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(timezoneParams != null)
    {
      if(timezoneParams.orderBy != null)
      params = params.append("orderBy", timezoneParams.orderBy);

      if(timezoneParams.searchBy != null)
      params = params.append("searchBy", timezoneParams.searchBy);

      if(timezoneParams.searchValue != null)
      params = params.append("searchValue", timezoneParams.searchValue);

      if(timezoneParams.reverseOrder != null)
      params = params.append("reverseOrder", timezoneParams.reverseOrder);
    }


    return this.http.get<Timezone[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Timezone By ID
  getTimezone(id: number): Observable<Timezone>{
    return this.http.get<Timezone>(this.baseUrl+id);
  }

  // Delete Timezone by ID
  deleteTimezoneById(id:number): Observable<Timezone>{
    return this.http.delete<Timezone>(this.baseUrl+id, this.httpOptions);
  }

  // Create Timezone
  createTimezone(model: any): Observable<Timezone>{
    return this.http.post<Timezone>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Timezone
  editTimezone(id:number , model:any): Observable<Timezone>{
    return this.http.put<Timezone>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Cities
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
