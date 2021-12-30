import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {map} from "rxjs/operators";

@Injectable()
export class LoginServicio{
    constructor( private auth:AngularFireAuth){
        
    }
    login(email:string,password:string){
          return new Promise((resolve,reject)=>{
            
            this.auth.signInWithEmailAndPassword(email, password)
              .then(datos=>resolve(datos),
                error=>reject(error)
              )
                 

          })
    }
    getAuth(){
      return this.auth.authState.pipe(
        map(auth=>auth)
      )
    }
    logout(){
      this.auth.signOut();
    }
    registrar(email:string,password:string){
      return new Promise((resolve,reject)=>{
        
        this.auth.createUserWithEmailAndPassword(email, password)
          .then(datos=>resolve(datos),
            error=>reject(error)
          )
             

      })
}
}
