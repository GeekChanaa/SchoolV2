import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { TaskComment } from '../_models/task-comment';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/taskComment/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all TaskComments
  getTaskComments(page?, itemsPerPage?, taskCommentParams?): Observable<PaginatedResult<TaskComment[]>>{
    const paginatedResult : PaginatedResult<TaskComment[]> = new PaginatedResult<TaskComment[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(taskCommentParams != null)
    {
      if(taskCommentParams.orderBy != null)
      params = params.append("orderBy", taskCommentParams.orderBy);

      if(taskCommentParams.searchBy != null)
      params = params.append("searchBy", taskCommentParams.searchBy);

      if(taskCommentParams.searchValue != null)
      params = params.append("searchValue", taskCommentParams.searchValue);

      if(taskCommentParams.reverseOrder != null)
      params = params.append("reverseOrder", taskCommentParams.reverseOrder);
    }


    return this.http.get<TaskComment[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting TaskComment By ID
  getTaskComment(id: number): Observable<TaskComment>{
    return this.http.get<TaskComment>(this.baseUrl+id);
  }

  // Delete TaskComment by ID
  deleteTaskCommentById(id:number): Observable<TaskComment>{
    return this.http.delete<TaskComment>(this.baseUrl+id, this.httpOptions);
  }

  // Create TaskComment
  createTaskComment(model: any): Observable<TaskComment>{
    return this.http.post<TaskComment>(this.baseUrl,model,this.httpOptions);
  }

  // Edit TaskComment
  editTaskComment(id:number , model:any): Observable<TaskComment>{
    return this.http.put<TaskComment>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Cities
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
