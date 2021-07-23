import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { ProjectColumn } from '../_models/project-column';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProjectColumnService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/city/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Cities
  getCities(page?, itemsPerPage?, cityParams?): Observable<PaginatedResult<ProjectColumn[]>>{
    const paginatedResult : PaginatedResult<ProjectColumn[]> = new PaginatedResult<ProjectColumn[]>();

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


    return this.http.get<ProjectColumn[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting ProjectColumn By ID
  getProjectColumn(id: number): Observable<ProjectColumn>{
    return this.http.get<ProjectColumn>(this.baseUrl+id);
  }

  // Delete ProjectColumn by ID
  deleteProjectColumnById(id:number): Observable<ProjectColumn>{
    return this.http.delete<ProjectColumn>(this.baseUrl+id, this.httpOptions);
  }

  // Create ProjectColumn
  createProjectColumn(model: any): Observable<ProjectColumn>{
    return this.http.post<ProjectColumn>(this.baseUrl,model,this.httpOptions);
  }

  // Edit ProjectColumn
  editProjectColumn(id:number , model:any): Observable<ProjectColumn>{
    return this.http.put<ProjectColumn>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Cities
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
