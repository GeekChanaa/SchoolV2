import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AbsenceJustification } from '../_models/absence-justification';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class AbsenceJustificationService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/absenceJustification/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all AbsenceJustifications
  getAbsenceJustifications(page?, itemsPerPage?, absenceJustificationParams?): Observable<PaginatedResult<AbsenceJustification[]>>{
    const paginatedResult : PaginatedResult<AbsenceJustification[]> = new PaginatedResult<AbsenceJustification[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(absenceJustificationParams != null)
    {
      if(absenceJustificationParams.orderBy != null)
      params = params.append("orderBy", absenceJustificationParams.orderBy);

      if(absenceJustificationParams.searchBy != null)
      params = params.append("searchBy", absenceJustificationParams.searchBy);

      if(absenceJustificationParams.searchValue != null)
      params = params.append("searchValue", absenceJustificationParams.searchValue);

      if(absenceJustificationParams.reverseOrder != null)
      params = params.append("reverseOrder", absenceJustificationParams.reverseOrder);
    }


    return this.http.get<AbsenceJustification[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting AbsenceJustification By ID
  getAbsenceJustification(id: number): Observable<AbsenceJustification>{
    return this.http.get<AbsenceJustification>(this.baseUrl+id);
  }

  // Delete AbsenceJustification by ID
  deleteAbsenceJustificationById(id:number): Observable<AbsenceJustification>{
    return this.http.delete<AbsenceJustification>(this.baseUrl+id, this.httpOptions);
  }

  // Create AbsenceJustification
  createAbsenceJustification(model: any): Observable<AbsenceJustification>{
    return this.http.post<AbsenceJustification>(this.baseUrl,model,this.httpOptions);
  }

  // Edit AbsenceJustification
  editAbsenceJustification(id:number , model:any): Observable<AbsenceJustification>{
    return this.http.put<AbsenceJustification>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting AbsenceJustifications
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
