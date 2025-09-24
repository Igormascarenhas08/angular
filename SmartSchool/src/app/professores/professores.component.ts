import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../titulo/titulo.component';
import { ModalAlunoComponent } from '../modal-aluno/modal-aluno.component';
import { Professor } from '../models/professor';
import { FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfessorService } from './professor.service';

@Component({
  selector: 'app-professores',
  standalone:true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,ModalAlunoComponent],
  templateUrl: './professores.component.html',
  styleUrl: './professores.component.css'
})
export class ProfessoresComponent {
  modalRef?: BsModalRef;
  professorForm!: FormGroup;
  titulo = 'Lista de Professores';
  professorSelecionado: Professor | null = null;

  public professores : Professor[] | undefined

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder, private modalService: BsModalService, private professorService: ProfessorService){
    this.criarForm();
  }

  ngOnInit(){
    this.carregarProfessores()
  }

  carregarProfessores(){//Get na tabela inteira de professores 
    this.professorService.getAll().subscribe(
      (professores : Professor[]) => {
        this.professores = professores;
      },
        (erro: any) => {console.error(erro)}
    )
  }


  professorSubmit(){//chamando a função para dar get na tabela passando o valor do forms como parâmetro
    this.salvarProfessor(this.professorForm.value)
  }

  criarForm(){
    this.professorForm = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required]
    })
  }

  professorSelected(professor: Professor){
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor)
  }

    salvarProfessor(professor : Professor){
      const operacao = professor.id === 0
      ? this.professorService.post(professor)
      : this.professorService.put(professor)

    operacao.subscribe(
      (professor:Professor) => {
        console.log(professor);
        this.carregarProfessores();
      },
      (error) => {console.log(error)}
    )
  }

  professorNovo(){
  this.professorSelecionado = new Professor;
  this.professorForm.patchValue(this.professorSelecionado)
}
  professorDeletar(id : number){
    this.professorService.delete(id).subscribe(
      (model:any) => {
        console.log("Deletado");
        this.carregarProfessores();
      },
      (error) => {console.log(error)}
    )
  }

  voltar(){
    this.professorSelecionado = null;
  }

  
}
