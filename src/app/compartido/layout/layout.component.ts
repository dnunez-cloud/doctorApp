import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompartidoService } from '../compartido.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  username: string = '';

  constructor(private router: Router, private compartidoService: CompartidoService,
              private cookieSerice: CookieService
  )
  {
  }

  ngOnInit(): void {
    const usuarioSesion = this.compartidoService.obtenerSesion();
    if(usuarioSesion!=null)
    {
      this.username = usuarioSesion;
    }
  }

  cerrarSesion() {
    this.compartidoService.eliminarSesion();
    this.cookieSerice.delete('Authorization','/');
    this.router.navigates(['login']);
  }
}
