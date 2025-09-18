import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alunos',
  imports: [CommonModule],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent {

  titulo = 'Alunos';

  alunos = [
    {nome:'Marta'},
    {nome:'Paula'},
    {nome:'Laura'},
    {nome:'Luiza'},
    {nome:'Lucas'},
    {nome:'Pedro'},
    {nome:'Paulo'}

  ];

}
