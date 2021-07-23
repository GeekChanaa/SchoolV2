import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { City } from '../_models/city';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/city/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Cities
  getCities(page?, itemsPerPage?, cityParams?): Observable<PaginatedResult<City[]>>{
    const paginatedResult : PaginatedResult<City[]> = new PaginatedResult<City[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(cityParams != null)
    {
      if(cityParams.orderBy != null)
      params = params.append("orderBy", cityParams.orderBy);

      if(cityParams.searchBy != null)
      params = params.append("searchBy", cityParams.searchBy);

      if(cityParams.searchValue != null)
      params = params.append("searchValue", cityParams.searchValue);

      if(cityParams.reverseOrder != null)
      params = params.append("reverseOrder", cityParams.reverseOrder);
    }


    return this.http.get<City[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting City By ID
  getCity(id: number): Observable<City>{
    return this.http.get<City>(this.baseUrl+id);
  }

  // Delete City by ID
  deleteCityById(id:number): Observable<City>{
    return this.http.delete<City>(this.baseUrl+id, this.httpOptions);
  }

  // Create City
  createCity(model: any): Observable<City>{
    return this.http.post<City>(this.baseUrl,model,this.httpOptions);
  }

  // Edit City
  editCity(id:number , model:any): Observable<City>{
    return this.http.put<City>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Cities
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
