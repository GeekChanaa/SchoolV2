import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Room } from '../_models/room';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  // Base URL for the api
  baseUrl = "https://localhost:5001/api/room/";

  // Constructor
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  };

  // Getting all Rooms
  getRooms(page?, itemsPerPage?, roomParams?): Observable<PaginatedResult<Room[]>>{
    const paginatedResult : PaginatedResult<Room[]> = new PaginatedResult<Room[]>();

    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber',page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Other filter and sort params
    if(roomParams != null)
    {
      if(roomParams.orderBy != null)
      params = params.append("orderBy", roomParams.orderBy);

      if(roomParams.searchBy != null)
      params = params.append("searchBy", roomParams.searchBy);

      if(roomParams.searchValue != null)
      params = params.append("searchValue", roomParams.searchValue);

      if(roomParams.reverseOrder != null)
      params = params.append("reverseOrder", roomParams.reverseOrder);
    }


    return this.http.get<Room[]>(this.baseUrl, {observe : 'response', params})
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

  // Getting Room By ID
  getRoom(id: number): Observable<Room>{
    return this.http.get<Room>(this.baseUrl+id);
  }

  // Delete Room by ID
  deleteRoomById(id:number): Observable<Room>{
    return this.http.delete<Room>(this.baseUrl+id, this.httpOptions);
  }

  // Create Room
  createRoom(model: any): Observable<Room>{
    return this.http.post<Room>(this.baseUrl,model,this.httpOptions);
  }

  // Edit Room
  editRoom(id:number , model:any): Observable<Room>{
    return this.http.put<Room>(this.baseUrl+id, model, this.httpOptions);
  }

  // counting Rooms
  count(){
    return this.http.get(this.baseUrl+"count", this.httpOptions);
  }
}
