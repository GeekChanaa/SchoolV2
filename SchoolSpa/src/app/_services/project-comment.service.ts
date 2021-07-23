import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { ProjectComment } from '../_models/project-comment';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProjectCommentService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/projectComments/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Cities
  getCities(page?, itemsPerPage?, projectCommentsParams?): Observable<PaginatedResult<ProjectComment[]>>{
    const paginatedResult : PaginatedResult<ProjectComment[]> = new PaginatedResult<ProjectComment[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(projectCommentsParams != null)
    {
      if(projectCommentsParams.orderBy != null)
      params = params.append("orderBy", projectCommentsParams.orderBy);

      if(projectCommentsParams.searchBy != null)
      params = params.append("searchBy", projectCommentsParams.searchBy);

      if(projectCommentsParams.searchValue != null)
      params = params.append("searchValue", projectCommentsParams.searchValue);

      if(projectCommentsParams.reverseOrder != null)
      params = params.append("reverseOrder", projectCommentsParams.reverseOrder);
    }


    return this.http.get<ProjectComment[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting ProjectComment By ID
  getProjectComment(id: number): Observable<ProjectComment>{
    return this.http.get<ProjectComment>(this.baseUrl+id);
  }

  // Delete ProjectComment by ID
  deleteProjectCommentById(id:number): Observable<ProjectComment>{
    return this.http.delete<ProjectComment>(this.baseUrl+id, this.httpOptions);
  }

  // Create ProjectComment
  createProjectComment(model: any): Observable<ProjectComment>{
    return this.http.post<ProjectComment>(this.baseUrl,model,this.httpOptions);
  }

  // Edit ProjectComment
  editProjectComment(id:number , model:any): Observable<ProjectComment>{
    return this.http.put<ProjectComment>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Cities
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
