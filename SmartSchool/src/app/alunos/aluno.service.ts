import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http : HttpClient) {}

    baseUrl = 'http://localhost:5000/api/aluno';
      
    getAll(): Observable<Aluno[]>{
      return this.http.get<Aluno[]>(`${this.baseUrl}`);
    }

    getAlunos(filtros: any): Observable<Aluno[]> {
    let params = new HttpParams();

    if (filtros.id) {
      params = params.set('id', filtros.id.toString());
    }

    if (filtros.nome) {
      params = params.set('nome', filtros.nome);
    }

    if (filtros.sobrenome) {
      params = params.set('sobrenome', filtros.sobrenome);
    }

    return this.http.get<Aluno[]>(`${this.baseUrl}/search`, { params });
  }

    getById(id: number): Observable<Aluno>{
      return this.http.get<Aluno>(`${this.baseUrl}/${id}`);
    }

    post(aluno : Aluno){
      return this.http.post(`${this.baseUrl}`, aluno);
    }

    put(aluno : Aluno): Observable<any>{
      return this.http.put(`${this.baseUrl}/${aluno.id}`, aluno);
    }

    delete(id : number){
      return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
