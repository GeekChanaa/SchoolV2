import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { School } from '../_models/school';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/school/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Schools
  getSchools(page?, itemsPerPage?, schoolParams?): Observable<PaginatedResult<School[]>>{
    const paginatedResult : PaginatedResult<School[]> = new PaginatedResult<School[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(schoolParams != null)
    {
      if(schoolParams.orderBy != null)
      params = params.append("orderBy", schoolParams.orderBy);

      if(schoolParams.searchBy != null)
      params = params.append("searchBy", schoolParams.searchBy);

      if(schoolParams.searchValue != null)
      params = params.append("searchValue", schoolParams.searchValue);

      if(schoolParams.reverseOrder != null)
      params = params.append("reverseOrder", schoolParams.reverseOrder);
    }


    return this.http.get<School[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting School By ID
  getSchool(id: number): Observable<School>{
    return this.http.get<School>(this.baseUrl+id);
  }

  // Delete School by ID
  deleteSchoolById(id:number): Observable<School>{
    return this.http.delete<School>(this.baseUrl+id, this.httpOptions);
  }

  // Create School
  createSchool(model: any): Observable<School>{
    return this.http.post<School>(this.baseUrl,model,this.httpOptions);
  }

  // Edit School
  editSchool(id:number , model:any): Observable<School>{
    return this.http.put<School>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Schools
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
