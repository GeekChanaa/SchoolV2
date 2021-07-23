import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Country } from '../_models/country';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/country/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Countries
  getCountries(page?, itemsPerPage?, countryParams?): Observable<PaginatedResult<Country[]>>{
    const paginatedResult : PaginatedResult<Country[]> = new PaginatedResult<Country[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(countryParams != null)
    {
      if(countryParams.orderBy != null)
      params = params.append("orderBy", countryParams.orderBy);

      if(countryParams.searchBy != null)
      params = params.append("searchBy", countryParams.searchBy);

      if(countryParams.searchValue != null)
      params = params.append("searchValue", countryParams.searchValue);

      if(countryParams.reverseOrder != null)
      params = params.append("reverseOrder", countryParams.reverseOrder);
    }


    return this.http.get<Country[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Country By ID
  getCountry(id: number): Observable<Country>{
    return this.http.get<Country>(this.baseUrl+id);
  }

  // Delete Country by ID
  deleteCountryById(id:number): Observable<Country>{
    return this.http.delete<Country>(this.baseUrl+id, this.httpOptions);
  }

  // Create Country
  createCountry(model: any): Observable<Country>{
    return this.http.post<Country>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Country
  editCountry(id:number , model:any): Observable<Country>{
    return this.http.put<Country>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Countries
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
