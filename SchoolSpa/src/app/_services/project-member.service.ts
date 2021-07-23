import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { ProjectMember } from '../_models/project-member';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProjectMemberService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/projectMember/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all ProjectMembers
  getProjectMembers(page?, itemsPerPage?, projectMemberParams?): Observable<PaginatedResult<ProjectMember[]>>{
    const paginatedResult : PaginatedResult<ProjectMember[]> = new PaginatedResult<ProjectMember[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(projectMemberParams != null)
    {
      if(projectMemberParams.orderBy != null)
      params = params.append("orderBy", projectMemberParams.orderBy);

      if(projectMemberParams.searchBy != null)
      params = params.append("searchBy", projectMemberParams.searchBy);

      if(projectMemberParams.searchValue != null)
      params = params.append("searchValue", projectMemberParams.searchValue);

      if(projectMemberParams.reverseOrder != null)
      params = params.append("reverseOrder", projectMemberParams.reverseOrder);
    }


    return this.http.get<ProjectMember[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting ProjectMember By ID
  getProjectMember(id: number): Observable<ProjectMember>{
    return this.http.get<ProjectMember>(this.baseUrl+id);
  }

  // Delete ProjectMember by ID
  deleteProjectMemberById(id:number): Observable<ProjectMember>{
    return this.http.delete<ProjectMember>(this.baseUrl+id, this.httpOptions);
  }

  // Create ProjectMember
  createProjectMember(model: any): Observable<ProjectMember>{
    return this.http.post<ProjectMember>(this.baseUrl,model,this.httpOptions);
  }

  // Edit ProjectMember
  editProjectMember(id:number , model:any): Observable<ProjectMember>{
    return this.http.put<ProjectMember>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting ProjectMembers
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
