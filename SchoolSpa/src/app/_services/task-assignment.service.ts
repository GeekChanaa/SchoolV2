import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { TaskAssignment } from '../_models/task-assignment';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class TaskAssignmentService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/taskAssignment/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all TaskAssignments
  getTaskAssignments(page?, itemsPerPage?, taskAssignmentParams?): Observable<PaginatedResult<TaskAssignment[]>>{
    const paginatedResult : PaginatedResult<TaskAssignment[]> = new PaginatedResult<TaskAssignment[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(taskAssignmentParams != null)
    {
      if(taskAssignmentParams.orderBy != null)
      params = params.append("orderBy", taskAssignmentParams.orderBy);

      if(taskAssignmentParams.searchBy != null)
      params = params.append("searchBy", taskAssignmentParams.searchBy);

      if(taskAssignmentParams.searchValue != null)
      params = params.append("searchValue", taskAssignmentParams.searchValue);

      if(taskAssignmentParams.reverseOrder != null)
      params = params.append("reverseOrder", taskAssignmentParams.reverseOrder);
    }


    return this.http.get<TaskAssignment[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting TaskAssignment By ID
  getTaskAssignment(id: number): Observable<TaskAssignment>{
    return this.http.get<TaskAssignment>(this.baseUrl+id);
  }

  // Delete TaskAssignment by ID
  deleteTaskAssignmentById(id:number): Observable<TaskAssignment>{
    return this.http.delete<TaskAssignment>(this.baseUrl+id, this.httpOptions);
  }

  // Create TaskAssignment
  createTaskAssignment(model: any): Observable<TaskAssignment>{
    return this.http.post<TaskAssignment>(this.baseUrl,model,this.httpOptions);
  }

  // Edit TaskAssignment
  editTaskAssignment(id:number , model:any): Observable<TaskAssignment>{
    return this.http.put<TaskAssignment>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting TaskAssignments
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
