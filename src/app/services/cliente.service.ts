import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Cliente } from "../model/cilente.model";
import {map, retry} from "rxjs/operators";
@Injectable()
export class ClienteServicio{
    clientesColeccion:AngularFirestoreCollection<Cliente>;
    ClienteDoc:AngularFirestoreDocument<Cliente>;
    Clientes:Observable<Cliente[]>;
    Cliente:Observable<Cliente>;

    constructor(private db:AngularFirestore){
       this.clientesColeccion=db.collection('clientes',ref=>ref.orderBy('nombre','asc'));
    }
    getClientes():Observable<Cliente[]>{
        this.Clientes=this.clientesColeccion.snapshotChanges().pipe(
            map(cambios=>{
                return cambios.map(
                    accion=>{
                        const datos=accion.payload.doc.data() as Cliente;
                        datos.id=accion.payload.doc.id;
                        return datos;
                    }
                )

            })
        )
        return this.Clientes;
    }
   agregarCliente(cliente: Cliente): void {
       this.clientesColeccion.add(cliente);
    }
    getCliente(id:string){
        this.ClienteDoc=this.db.doc<Cliente>(`clientes/${id}`);
        this.Cliente=this.ClienteDoc.snapshotChanges().pipe(
            map(accion=>{
                if (accion.payload.exists===false) {
                  return null;
                   
                }else{
                    const datos=accion.payload.data() as Cliente;
                    datos.id=accion.payload.id;
                    return datos;}
            })
        )
        return this.Cliente
    }
    modificarCliente(cliente:Cliente){
        this.ClienteDoc=this.db.doc(`clientes/${cliente.id}`)
        this.ClienteDoc.update(cliente);
     }
     eliminarCliente(cliente:Cliente){
        this.ClienteDoc=this.db.doc(`clientes/${cliente.id}`)
        this.ClienteDoc.delete();

     }

}