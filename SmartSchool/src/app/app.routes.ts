import { Routes } from '@angular/router';
import { ProfessoresComponent } from './professores/professores.component';
import { AlunosComponent } from './alunos/alunos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'professores', component: ProfessoresComponent},
    { path: 'alunos', component: AlunosComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'perfil', component: PerfilComponent}
];
