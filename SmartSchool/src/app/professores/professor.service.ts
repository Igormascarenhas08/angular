import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http:HttpClient) {}

  baseUrl = 'http://localhost:5000/api/professor';

  getAll(): Observable<Professor[]>{
    return this.http.get<Professor[]>(`${this.baseUrl}`)
  }

  getById(id : number): Observable<Professor>{
    return this.http.get<Professor>(`${this.baseUrl}/${id}`)
  }

  post(professor: Professor){
    return this.http.post(`${this.baseUrl}`, professor);
  }

  put(professor : Professor) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${professor.id}`, professor)
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
