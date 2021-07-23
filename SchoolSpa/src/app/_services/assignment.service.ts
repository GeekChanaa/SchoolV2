import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Assignment } from '../_models/assignment';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/assignment/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Assignments
  getAssignments(page?, itemsPerPage?, assignmentParams?): Observable<PaginatedResult<Assignment[]>>{
    const paginatedResult : PaginatedResult<Assignment[]> = new PaginatedResult<Assignment[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(assignmentParams != null)
    {
      if(assignmentParams.orderBy != null)
      params = params.append("orderBy", assignmentParams.orderBy);

      if(assignmentParams.searchBy != null)
      params = params.append("searchBy", assignmentParams.searchBy);

      if(assignmentParams.searchValue != null)
      params = params.append("searchValue", assignmentParams.searchValue);

      if(assignmentParams.reverseOrder != null)
      params = params.append("reverseOrder", assignmentParams.reverseOrder);
    }


    return this.http.get<Assignment[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Assignment By ID
  getAssignment(id: number): Observable<Assignment>{
    return this.http.get<Assignment>(this.baseUrl+id);
  }

  // Delete Assignment by ID
  deleteAssignmentById(id:number): Observable<Assignment>{
    return this.http.delete<Assignment>(this.baseUrl+id, this.httpOptions);
  }

  // Create Assignment
  createAssignment(model: any): Observable<Assignment>{
    return this.http.post<Assignment>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Assignment
  editAssignment(id:number , model:any): Observable<Assignment>{
    return this.http.put<Assignment>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Assignments
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
