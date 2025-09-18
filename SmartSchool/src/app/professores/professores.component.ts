import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professores',
  imports: [CommonModule],
  templateUrl: './professores.component.html',
  styleUrl: './professores.component.css'
})
export class ProfessoresComponent {
  titulo = 'Professores'

  professores = [
    {nome:'Lauro'},
    {nome:'Vinícius'},
    {nome:'Albert'},
    {nome:'Bob'},
    {nome:'Fernando'},
    {nome:'Montana'},
    {nome:'João'}
  ]
}
