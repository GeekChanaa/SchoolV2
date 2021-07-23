import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Attendance } from '../_models/attendance';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/attendance/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Attendances
  getAttendances(page?, itemsPerPage?, attendanceParams?): Observable<PaginatedResult<Attendance[]>>{
    const paginatedResult : PaginatedResult<Attendance[]> = new PaginatedResult<Attendance[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(attendanceParams != null)
    {
      if(attendanceParams.orderBy != null)
      params = params.append("orderBy", attendanceParams.orderBy);

      if(attendanceParams.searchBy != null)
      params = params.append("searchBy", attendanceParams.searchBy);

      if(attendanceParams.searchValue != null)
      params = params.append("searchValue", attendanceParams.searchValue);

      if(attendanceParams.reverseOrder != null)
      params = params.append("reverseOrder", attendanceParams.reverseOrder);
    }


    return this.http.get<Attendance[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Attendance By ID
  getAttendance(id: number): Observable<Attendance>{
    return this.http.get<Attendance>(this.baseUrl+id);
  }

  // Delete Attendance by ID
  deleteAttendanceById(id:number): Observable<Attendance>{
    return this.http.delete<Attendance>(this.baseUrl+id, this.httpOptions);
  }

  // Create Attendance
  createAttendance(model: any): Observable<Attendance>{
    return this.http.post<Attendance>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Attendance
  editAttendance(id:number , model:any): Observable<Attendance>{
    return this.http.put<Attendance>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Attendances
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
