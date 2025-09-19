
import { Component,TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../titulo/titulo.component'; 
import { ProfessoresComponent } from '../professores/professores.component';
import { Aluno } from '../models/aluno';
import {FormBuilder, FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-alunos',
  standalone:true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, ModalModule, ProfessoresComponent],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent {
  alunoForm!: FormGroup;
  titulo = 'Lista de Alunos'
  alunoSelecionado: Aluno | null = null;
  textSimple: string = ''
  modalRef?: BsModalRef;

  alunos = [
    {id: 1, nome:'Marta', sobrenome: 'Kent', telefone:'33225543'},
    {id: 2, nome:'Paula', sobrenome: 'Isabela', telefone: '3325432'},
    {id: 3, nome:'Laura', sobrenome: 'Antonia', telefone: '36734255'},
    {id: 4, nome:'Luiza', sobrenome: 'Maria', telefone: '7672255'},
    {id: 5, nome:'Lucas', sobrenome: 'Machado', telefone: '87832255'},
    {id: 6, nome:'Pedro', sobrenome: 'Alves', telefone: '9832255'},
    {id: 7, nome:'Paulo', sobrenome: 'José', telefone: '87832255'}

  ];

  constructor(private fb: FormBuilder, private modalService: BsModalService){
    this.criarForm()
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm(){
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    })
  }

  alunoSelected(aluno: Aluno){
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno)
  }

  voltar(){
    this.alunoSelecionado = null;
  }

  alunoSubmit(){
    console.log(this.alunoForm.value);
  }

}
