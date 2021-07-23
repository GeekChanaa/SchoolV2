import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Teacher } from '../_models/teacher';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/teacher/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Teachers
  getTeachers(page?, itemsPerPage?, teacherParams?): Observable<PaginatedResult<Teacher[]>>{
    const paginatedResult : PaginatedResult<Teacher[]> = new PaginatedResult<Teacher[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(teacherParams != null)
    {
      if(teacherParams.orderBy != null)
      params = params.append("orderBy", teacherParams.orderBy);

      if(teacherParams.searchBy != null)
      params = params.append("searchBy", teacherParams.searchBy);

      if(teacherParams.searchValue != null)
      params = params.append("searchValue", teacherParams.searchValue);

      if(teacherParams.reverseOrder != null)
      params = params.append("reverseOrder", teacherParams.reverseOrder);
    }


    return this.http.get<Teacher[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Teacher By ID
  getTeacher(id: number): Observable<Teacher>{
    return this.http.get<Teacher>(this.baseUrl+id);
  }

  // Delete Teacher by ID
  deleteTeacherById(id:number): Observable<Teacher>{
    return this.http.delete<Teacher>(this.baseUrl+id, this.httpOptions);
  }

  // Create Teacher
  createTeacher(model: any): Observable<Teacher>{
    return this.http.post<Teacher>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Teacher
  editTeacher(id:number , model:any): Observable<Teacher>{
    return this.http.put<Teacher>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Teachers
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
