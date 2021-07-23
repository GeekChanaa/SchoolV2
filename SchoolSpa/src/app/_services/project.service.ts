import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Project } from '../_models/project';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/project/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Projects
  getProjects(page?, itemsPerPage?, projectParams?): Observable<PaginatedResult<Project[]>>{
    const paginatedResult : PaginatedResult<Project[]> = new PaginatedResult<Project[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(projectParams != null)
    {
      if(projectParams.orderBy != null)
      params = params.append("orderBy", projectParams.orderBy);

      if(projectParams.searchBy != null)
      params = params.append("searchBy", projectParams.searchBy);

      if(projectParams.searchValue != null)
      params = params.append("searchValue", projectParams.searchValue);

      if(projectParams.reverseOrder != null)
      params = params.append("reverseOrder", projectParams.reverseOrder);
    }


    return this.http.get<Project[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Project By ID
  getProject(id: number): Observable<Project>{
    return this.http.get<Project>(this.baseUrl+id);
  }

  // Delete Project by ID
  deleteProjectById(id:number): Observable<Project>{
    return this.http.delete<Project>(this.baseUrl+id, this.httpOptions);
  }

  // Create Project
  createProject(model: any): Observable<Project>{
    return this.http.post<Project>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Project
  editProject(id:number , model:any): Observable<Project>{
    return this.http.put<Project>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Projects
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
