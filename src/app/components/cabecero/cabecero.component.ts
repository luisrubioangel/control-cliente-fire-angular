import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/model/configuracion.model';
import { ConfiguracionSErvicio } from 'src/app/services/configuracio.service';
import { LoginServicio } from 'src/app/services/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.scss']
})
export class CabeceroComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
 // mostrarRegistro:boolean;
  permitirRegistro:boolean;
  
  constructor(
    private loginservice:LoginServicio,
    private router:Router,
    private configuracionServicio:ConfiguracionSErvicio

  ) { }

  ngOnInit(): void {
    this.loginservice.getAuth().subscribe(auth=>{
      if(auth){
      this.isLoggedIn=false;
      this.loggedInUser=auth.email;
      }else{
        this.isLoggedIn=true;
      }

    })
    this.configuracionServicio.getConfiguracion().subscribe(
      configuracion=>{this.permitirRegistro=configuracion.permitirRegistro;
      }
    )
  }
  logout(){
    this.loginservice.logout();
    this.isLoggedIn=false;
    this.router.navigate(['/login'])
  }

}
