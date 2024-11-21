import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Medico } from '../../interfaces/medico';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MedicoService } from '../../servicios/medico.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalMedicoComponent } from '../../modales/modal-medico/modal-medico.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-medico',
  templateUrl: './listado-medico.component.html',
  styleUrl: './listado-medico.component.css'
})
export class ListadoMedicoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[]=[
    'apellidos',
    'nombres',
    'telefonos',
    'genero',
    'nombreEspecialidad',
    'estado',
    'acciones'
  ];

  dataInicial: Medico[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _medicoServicio: MedicoService,
    private _compartidoServicio: CompartidoService,
    private dialog: MatDialog
  ){}

  ObtenerMedicos(){
    this._medicoServicio.lista().subscribe({
      next: (data) => {
        if(data.isExistoso)
        {
          this.dataSource = new MatTableDataSource(data.resultado);
          this.dataSource.paginator = this.paginator;
        }
        else
          this._compartidoServicio.mostrarAlerta('No hay datos', 'Advertencia');
      },
      error: (e) => {}
    })
  }

  nuevoMedico(){
    this.dialog
        .open(ModalMedicoComponent, { disabledClose: true, width: '600px' })
        .afterClosed()
        .subscribe((resultado) => {
          if(resultado === 'true') this.ObtenerMedicos();
        });
  }

  editarMedico(medico: Medico) {
    this.dialog
        .open(ModalMedicoComponent, { disabledClose: true, widht: '600px', data: medico })
        .afterClosed()
        .subscribe((resultado) => {
          if(resultado === 'true') this.ObtenerMedicos();
        });
  }

  removerMedico(medico: Medico) {
    Swal.fire({
      title: 'Desea eliminar?',
      text: medico.apellidos+' '+medico.nombres,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((resultado) => {
      if(resultado.isConfirmed) {
        this._medicoServicio.eliminar(medico.id).subscribe({
          next: (data) => {
            if(data.isExistoso){
              this._compartidoServicio.mostrarAlerta('Eliminado', 'Completo');
              this.ObtenerMedicos();
            }
            else{
              this._compartidoServicio.mostrarAlerta('No se pudo eliminar', 'Error');
            }
          }
        });
      }
    })
  }

  aplicarFiltroListado(events: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim.toLowerCase();
    if(dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.ObtenerMedicos();
  }
}
