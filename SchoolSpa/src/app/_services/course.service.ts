import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Course } from '../_models/course';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/course/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Courses
  getCourses(page?, itemsPerPage?, courseParams?): Observable<PaginatedResult<Course[]>>{
    const paginatedResult : PaginatedResult<Course[]> = new PaginatedResult<Course[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(courseParams != null)
    {
      if(courseParams.orderBy != null)
      params = params.append("orderBy", courseParams.orderBy);

      if(courseParams.searchBy != null)
      params = params.append("searchBy", courseParams.searchBy);

      if(courseParams.searchValue != null)
      params = params.append("searchValue", courseParams.searchValue);

      if(courseParams.reverseOrder != null)
      params = params.append("reverseOrder", courseParams.reverseOrder);
    }


    return this.http.get<Course[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Course By ID
  getCourse(id: number): Observable<Course>{
    return this.http.get<Course>(this.baseUrl+id);
  }

  // Delete Course by ID
  deleteCourseById(id:number): Observable<Course>{
    return this.http.delete<Course>(this.baseUrl+id, this.httpOptions);
  }

  // Create Course
  createCourse(model: any): Observable<Course>{
    return this.http.post<Course>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Course
  editCourse(id:number , model:any): Observable<Course>{
    return this.http.put<Course>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Courses
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
