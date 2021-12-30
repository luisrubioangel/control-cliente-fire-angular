import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/model/configuracion.model';
import { ConfiguracionSErvicio } from 'src/app/services/configuracio.service';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  permitirRegistro=false;
  constructor(
    private router:Router,
    private configuracioServicio:ConfiguracionSErvicio

  ) { }

  ngOnInit(): void {
    this.configuracioServicio.getConfiguracion().subscribe(
      (configuracion:Configuracion)=>{
        this.permitirRegistro=configuracion.permitirRegistro;
      }
    )
  }
  guardar(){
    let configuracion={permitirRegistro: this.permitirRegistro};
    this.configuracioServicio.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);
  }

}
