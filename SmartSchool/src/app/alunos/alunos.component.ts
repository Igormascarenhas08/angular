
import { Component,TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../titulo/titulo.component'; 
import { ModalProfessorComponent } from '../modal-professor/modal-professor.component';
// import { ProfessoresComponent } from '../professores/professores.component';
import { Aluno } from '../models/aluno';
import {FormBuilder, FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-alunos',
  standalone:true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,ModalProfessorComponent],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})

export class AlunosComponent {
  alunoForm!: FormGroup;
  titulo = 'Lista de Alunos';
  alunoSelecionado: Aluno | null = null;
  modalRef?: BsModalRef;
  modo: 'post' | 'put' | undefined;

  public alunos: Aluno[] | undefined;

  constructor(private fb: FormBuilder, private modalService: BsModalService, private alunoService: AlunoService){
    this.criarForm()
  }

  ngOnInit(){
    this.carregarAlunos();
  }

  carregarAlunos(){
    this.alunoService.getAll().subscribe(
      (alunos: Aluno[]) => {
        this.alunos = alunos;
      },
      (erro: any) => {console.error(erro)}
    );
  };

  salvarAluno(aluno : Aluno){
      const operacao = aluno.id === 0
    ? this.alunoService.post(aluno)
    : this.alunoService.put(aluno);

    operacao.subscribe(
      (aluno : Aluno) => {
        console.log(aluno) 
        this.carregarAlunos();
      },
      (error:any) => {console.log(error)}
    )
  }

  alunoSubmit(){
    this.salvarAluno(this.alunoForm.value)
  }


  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm(){
    this.alunoForm = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    })
  }

  alunoSelected(aluno: Aluno){
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno)
  }

  alunoNovo(){
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado)
  }

  alunoDeletar(id : number){
    this.alunoService.delete(id).subscribe(
      (model : any) => {
        console.log(model);
        this.carregarAlunos()
      },
      (error:any) => {console.log(error)}
    )

  }

  voltar(){
    this.alunoSelecionado = null;
  }
}