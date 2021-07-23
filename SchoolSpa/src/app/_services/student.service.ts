import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Student } from '../_models/student';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/student/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Students
  getStudents(page?, itemsPerPage?, studentParams?): Observable<PaginatedResult<Student[]>>{
    const paginatedResult : PaginatedResult<Student[]> = new PaginatedResult<Student[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(studentParams != null)
    {
      if(studentParams.orderBy != null)
      params = params.append("orderBy", studentParams.orderBy);

      if(studentParams.searchBy != null)
      params = params.append("searchBy", studentParams.searchBy);

      if(studentParams.searchValue != null)
      params = params.append("searchValue", studentParams.searchValue);

      if(studentParams.reverseOrder != null)
      params = params.append("reverseOrder", studentParams.reverseOrder);
    }


    return this.http.get<Student[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Student By ID
  getStudent(id: number): Observable<Student>{
    return this.http.get<Student>(this.baseUrl+id);
  }

  // Delete Student by ID
  deleteStudentById(id:number): Observable<Student>{
    return this.http.delete<Student>(this.baseUrl+id, this.httpOptions);
  }

  // Create Student
  createStudent(model: any): Observable<Student>{
    return this.http.post<Student>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Student
  editStudent(id:number , model:any): Observable<Student>{
    return this.http.put<Student>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Students
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
