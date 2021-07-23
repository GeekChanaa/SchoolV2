import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { MailLabel } from '../_models/mail-label';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MailLabelService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/mailLabel/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all MailLabels
  getMailLabels(page?, itemsPerPage?, mailLabelParams?): Observable<PaginatedResult<MailLabel[]>>{
    const paginatedResult : PaginatedResult<MailLabel[]> = new PaginatedResult<MailLabel[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(mailLabelParams != null)
    {
      if(mailLabelParams.orderBy != null)
      params = params.append("orderBy", mailLabelParams.orderBy);

      if(mailLabelParams.searchBy != null)
      params = params.append("searchBy", mailLabelParams.searchBy);

      if(mailLabelParams.searchValue != null)
      params = params.append("searchValue", mailLabelParams.searchValue);

      if(mailLabelParams.reverseOrder != null)
      params = params.append("reverseOrder", mailLabelParams.reverseOrder);
    }


    return this.http.get<MailLabel[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting MailLabel By ID
  getMailLabel(id: number): Observable<MailLabel>{
    return this.http.get<MailLabel>(this.baseUrl+id);
  }

  // Delete MailLabel by ID
  deleteMailLabelById(id:number): Observable<MailLabel>{
    return this.http.delete<MailLabel>(this.baseUrl+id, this.httpOptions);
  }

  // Create MailLabel
  createMailLabel(model: any): Observable<MailLabel>{
    return this.http.post<MailLabel>(this.baseUrl,model,this.httpOptions);
  }

  // Edit MailLabel
  editMailLabel(id:number , model:any): Observable<MailLabel>{
    return this.http.put<MailLabel>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting MailLabels
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
