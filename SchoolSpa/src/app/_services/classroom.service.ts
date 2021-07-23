import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Classroom } from '../_models/classroom';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/classroom/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Classrooms
  getClassrooms(page?, itemsPerPage?, classroomParams?): Observable<PaginatedResult<Classroom[]>>{
    const paginatedResult : PaginatedResult<Classroom[]> = new PaginatedResult<Classroom[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(classroomParams != null)
    {
      if(classroomParams.orderBy != null)
      params = params.append("orderBy", classroomParams.orderBy);

      if(classroomParams.searchBy != null)
      params = params.append("searchBy", classroomParams.searchBy);

      if(classroomParams.searchValue != null)
      params = params.append("searchValue", classroomParams.searchValue);

      if(classroomParams.reverseOrder != null)
      params = params.append("reverseOrder", classroomParams.reverseOrder);
    }


    return this.http.get<Classroom[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Classroom By ID
  getClassroom(id: number): Observable<Classroom>{
    return this.http.get<Classroom>(this.baseUrl+id);
  }

  // Delete Classroom by ID
  deleteClassroomById(id:number): Observable<Classroom>{
    return this.http.delete<Classroom>(this.baseUrl+id, this.httpOptions);
  }

  // Create Classroom
  createClassroom(model: any): Observable<Classroom>{
    return this.http.post<Classroom>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Classroom
  editClassroom(id:number , model:any): Observable<Classroom>{
    return this.http.put<Classroom>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Classrooms
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
