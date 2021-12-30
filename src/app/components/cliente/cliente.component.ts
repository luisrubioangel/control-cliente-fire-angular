import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/model/cilente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  clientes:Cliente[];
  cliente:Cliente={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }
  @ViewChild("clienteForm") clienteForm:NgForm;
  @ViewChild("botonCerrar") botonCerrar:ElementRef;

  constructor(private clienteservicio:ClienteServicio,
              private flashMessagesService:FlashMessagesService) { }

  ngOnInit(): void {
    this.clienteservicio.getClientes().subscribe(
      clientes=>{
        this.clientes=clientes;

      }
    )
    
  }
  getSaldoTotal():number{
    let saltdoTotal=0;
    if (this.clientes) {
      this.clientes.forEach(cliente=>{
        saltdoTotal+=cliente.saldo;
      })
    }
    return saltdoTotal
    }
  agregar({value, valid}: {value: Cliente, valid: boolean}){
   if(!valid){
           this.flashMessagesService.show('por facor lina el formulario correctamente',{
             cssClass:'alert-danger',timeout:4000
      });
   }else{
     //agregar el nuevo ciente 
     this.clienteservicio.agregarCliente(value);
     this.clienteForm.resetForm();
     this.cerrarModal();
   }

  }
  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
}
