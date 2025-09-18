import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../titulo/titulo.component';
import { Professor } from '../models/professor';

@Component({
  selector: 'app-professores',
  standalone:true,
  imports: [CommonModule,TituloComponent],
  templateUrl: './professores.component.html',
  styleUrl: './professores.component.css'
})
export class ProfessoresComponent {
  titulo = 'Lista de Professores'
  professorSelecionado: Professor | null = null

  professores = [
    {id: 1,nome:'Lauro', disciplina: 'Matemática'},
    {id: 2,nome:'Vinícius', disciplina: 'Física'},
    {id: 3,nome:'Albert', disciplina: 'Português'},
    {id: 4,nome:'Bob', disciplina: 'Inglês'},
    {id: 5,nome:'Fernando', disciplina: 'Geografia'},
    {id: 6,nome:'Montana', disciplina: 'História'},
    {id: 7,nome:'João', disciplina: 'Química'}
  ]

  professorSelected(professor: Professor){
    this.professorSelecionado = professor;
  }

  voltar(){
    this.professorSelecionado = null;
  }
  
}
