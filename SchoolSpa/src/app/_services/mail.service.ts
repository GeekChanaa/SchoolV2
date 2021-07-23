import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Mail } from '../_models/mail';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/mail/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Mails
  getMails(page?, itemsPerPage?, mailParams?): Observable<PaginatedResult<Mail[]>>{
    const paginatedResult : PaginatedResult<Mail[]> = new PaginatedResult<Mail[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(mailParams != null)
    {
      if(mailParams.orderBy != null)
      params = params.append("orderBy", mailParams.orderBy);

      if(mailParams.searchBy != null)
      params = params.append("searchBy", mailParams.searchBy);

      if(mailParams.searchValue != null)
      params = params.append("searchValue", mailParams.searchValue);

      if(mailParams.reverseOrder != null)
      params = params.append("reverseOrder", mailParams.reverseOrder);
    }


    return this.http.get<Mail[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Mail By ID
  getMail(id: number): Observable<Mail>{
    return this.http.get<Mail>(this.baseUrl+id);
  }

  // Delete Mail by ID
  deleteMailById(id:number): Observable<Mail>{
    return this.http.delete<Mail>(this.baseUrl+id, this.httpOptions);
  }

  // Create Mail
  createMail(model: any): Observable<Mail>{
    return this.http.post<Mail>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Mail
  editMail(id:number , model:any): Observable<Mail>{
    return this.http.put<Mail>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Mails
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
