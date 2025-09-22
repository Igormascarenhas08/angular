import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../titulo/titulo.component';
import { AlunosComponent } from '../alunos/alunos.component';
import { Professor } from '../models/professor';
import { FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-professores',
  standalone:true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule, AlunosComponent],
  templateUrl: './professores.component.html',
  styleUrl: './professores.component.css'
})
export class ProfessoresComponent {
  modalRef?: BsModalRef;
  professorForm!: FormGroup;
  titulo = 'Lista de Professores';
  professorSelecionado: Professor | null = null;

  professores = [
    {id: 1,nome:'Lauro', disciplina: 'Matemática'},
    {id: 2,nome:'Vinícius', disciplina: 'Física'},
    {id: 3,nome:'Albert', disciplina: 'Português'},
    {id: 4,nome:'Bob', disciplina: 'Inglês'},
    {id: 5,nome:'Fernando', disciplina: 'Geografia'},
    {id: 6,nome:'Montana', disciplina: 'História'},
    {id: 7,nome:'João', disciplina: 'Química'}
  ]

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder, private modalService: BsModalService){
    this.criarForm();
  }

  criarForm(){
    this.professorForm = this.fb.group({
      nome: ['', Validators.required],
      disciplina: ['', Validators.required]
    })
  }

  professorSelected(professor: Professor){
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor)
  }

  voltar(){
    this.professorSelecionado = null;
  }

  professorSubmit(){
    console.log(this.professorForm.value)
  }
  
}
