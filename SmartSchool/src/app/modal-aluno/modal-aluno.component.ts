import { Component } from '@angular/core';
import { AlunosComponent } from '../alunos/alunos.component';

@Component({
  selector: 'app-modal-aluno',
  standalone:true,
  imports: [AlunosComponent],
  templateUrl: './modal-aluno.component.html',
  styleUrl: './modal-aluno.component.css'
})
export class ModalAlunoComponent {

}
