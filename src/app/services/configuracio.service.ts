import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { ConfiguracionComponent } from "../components/configuracion/configuracion.component";
import { Configuracion } from "../model/configuracion.model";
@Injectable()
export class ConfiguracionSErvicio{
  configuracionDoc: AngularFirestoreDocument<Configuracion>;
  configuracion:Observable<Configuracion>;
  //id unico dde la coleccion de confuguracion
  id='1';
  constructor(private db:AngularFirestore){

  }
  getConfiguracion():Observable<Configuracion>{
   this.configuracionDoc=this.db.doc<Configuracion>(`configuracion/${this.id}`)
   this.configuracion=this.configuracionDoc.valueChanges();

   return this.configuracion;
  }
  modificarConfiguracion(configuracion:Configuracion){
   this.configuracionDoc=this.db.doc<Configuracion>(`configuracion/${this.id}`);
   this.configuracionDoc.update(configuracion);
  }

}