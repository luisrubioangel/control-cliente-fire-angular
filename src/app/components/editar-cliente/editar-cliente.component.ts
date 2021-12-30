import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/model/cilente.model';
import { ClienteServicio } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {
  cliente:Cliente={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }

  id:string;

  constructor(private clienteservicio:ClienteServicio,
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute) { }

  

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.clienteservicio.getCliente(this.id).subscribe( cliente=>{
      this.cliente=cliente;

    }
    );
  }
  guardar({value,valid}:{value:Cliente,valid:boolean}){
   if (!valid) {
     this.flashMessagesService.show('porfavor llena el formulario correctamentedd**',{
       cssClass:'alert-danger',timeout:4000
     });
     
   }else{
     value.id=this.id;
     //
     this.clienteservicio.modificarCliente(value);
     this.router.navigate(['/'])
   }

  }
  eliminar(){
    if(confirm('?¿seguro que desea eliminar el cliente?')){
      this.clienteservicio.eliminarCliente(this.cliente);
      this.router.navigate(['/'])
    }
  }

}
