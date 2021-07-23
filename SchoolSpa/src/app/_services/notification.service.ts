import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Notification } from '../_models/notification';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/notification/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Notifications
  getNotifications(page?, itemsPerPage?, notificationParams?): Observable<PaginatedResult<Notification[]>>{
    const paginatedResult : PaginatedResult<Notification[]> = new PaginatedResult<Notification[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(notificationParams != null)
    {
      if(notificationParams.orderBy != null)
      params = params.append("orderBy", notificationParams.orderBy);

      if(notificationParams.searchBy != null)
      params = params.append("searchBy", notificationParams.searchBy);

      if(notificationParams.searchValue != null)
      params = params.append("searchValue", notificationParams.searchValue);

      if(notificationParams.reverseOrder != null)
      params = params.append("reverseOrder", notificationParams.reverseOrder);
    }


    return this.http.get<Notification[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Notification By ID
  getNotification(id: number): Observable<Notification>{
    return this.http.get<Notification>(this.baseUrl+id);
  }

  // Delete Notification by ID
  deleteNotificationById(id:number): Observable<Notification>{
    return this.http.delete<Notification>(this.baseUrl+id, this.httpOptions);
  }

  // Create Notification
  createNotification(model: any): Observable<Notification>{
    return this.http.post<Notification>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Notification
  editNotification(id:number , model:any): Observable<Notification>{
    return this.http.put<Notification>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Notifications
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
