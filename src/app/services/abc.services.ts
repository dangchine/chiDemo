import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { response } from 'express';
@Injectable({
    providedIn: 'root'
  })

 export class XyzService {
    domain='http://localhost:3001/data'// đường dẫn đến với backend.
    constructor(private http: HttpClient){
    }
    

 
    public getData(): Observable <any>{
        return this.http.get(this.domain)
    }
    public luu(dataAdd:any):Observable <any> {
        return this.http.post(this.domain,dataAdd)
    }
    public xoa(id:number):Observable <any> {
       return this.http.delete(this.domain+`/${id}`)
    }
    public sua(data:any):Observable<any>{
        return this.http.put(this.domain+`/${data.id}`,{name:data.name,age:data.age})
    }
    public paginate(data:any):Observable<any>{
        return this.http.get(this.domain+`?_page=${data.page}&_limit=${data.limit}`)
    }
    public tim(data:any):Observable<any>{
        return this.http.get(this.domain+`?q=${data.search}`)
    }
}
