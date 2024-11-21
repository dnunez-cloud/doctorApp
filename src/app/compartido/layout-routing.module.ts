import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { } from '../medico/medico.module';
import { } from '../especialidad/especialidad.module';
import { } from '../usuario/usuario.module';
import { ListadoMedicoComponent } from '../medico/pages/listado-medico/listado-medico.component';
import { ListadoUsuarioComponent } from '../usuario/pages/listado-usuario/listado-usuario.component';
import { ListadoEspecialidadComponent } from '../especialidad/pages/listado-especialidad/listado-especialidad.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path:'especialidades', component: ListadoEspecialidadComponent, pathMatch:'full'},
      { path:'medicos', component: ListadoMedicoComponent, pathMatch:'full'},
      { path:'usuarios', component: ListadoUsuarioComponent, pathMatch:'full'},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
