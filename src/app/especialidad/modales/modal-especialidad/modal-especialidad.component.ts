import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Especialidad } from '../../interfaces/especialidad';
import { EspecialidadService } from '../../servicios/especialidad.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';

@Component({
  selector: 'app-modal-especialidad',
  templateUrl: './modal-especialidad.component.html',
  styleUrl: './modal-especialidad.component.css'
})
export class ModalEspecialidadComponent implements OnInit {
  formEspecialidad: formGroup;
  titulo: "Agregar";
  nombreBoton: string = "Guardar";

  constructor(private modal: MatDialogRef<ModalEspecialidadComponent>,
              @Inject(MAT_DIALOG_DATA) public datosEspecialidad: Especialidad,
              private fb: FormBuilder,
              private _especialidadServicio: EspecialidadService,
             private _compartidoServicio: CompartidoService ){
    this.formEspecialidad = this.fb.group({
      nombreEspecialidad: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['1', Validators.required]
    });
    if(this.datosEspecialidad != null) {
      this.titulo = 'Editar',
      this.nombreBoton = 'Actualizar'
    }
  }

  ngOnInit(): void {
    if (this.datosEspecialidad != null) {
      this.formEspecialidad.patchValue({
        nombreEspecialidad: this.datosEspecialidad.nombreEspecialidad,
        descripcion: this.datosEspecialidad.descripcion,
        estado: this.datosEspecialidad.estado.toString()
      })
    }
  }

  crearModificarEspecialidad() {
    const especialidad: Especialidad = {
      id: this.datosEspecialidad == null ? 0 : this.datosEspecialidad.id,
      nombreEspecialidad: this.formEspecialidad.value.nombreEspecialidad,
      descripcion: this.formEspecialidad.value.descripcion,
      estado: parseInt(this.formEspecialidad.value.estado)
    }
    if (this.datosEspecialidad == null)
    {
      this._especialidadServicio.crear(especialidad).subscribe({
        next: (data) => {
          if(data.isExistoso)
          {
            this._compartidoServicio.mostrarAlerta('La Especialidad ha sido grabada con exito', 'Completo');
            this.modal.close("true");
          }
          else
          {
            this._compartidoServicio.mostrarAlerta('No se pudo crear', 'Error');
          }
        },
        error: (e) => {}
      });
    }
    else {
      this._especialidadServicio.editar(especialidad).subscribe({
        next: (data) => {
          if(data.isExistoso)
          {
            this._compartidoServicio.mostrarAlerta('La Especialidad ha sido actualizaa con exito', 'Completo');
            this.modal.close("true");
          }
          else
          {
            this._compartidoServicio.mostrarAlerta('No se pudo actualizar', 'Error');
          }
        },
        error: (e) => {}
      });
    }
  }
}
