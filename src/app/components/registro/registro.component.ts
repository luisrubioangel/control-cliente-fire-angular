import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServicio } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private route:Router,
    // private flashMessages:FlashMessagesComponent,
     private loginService:LoginServicio) { }

     email:string;
     password:string;

     ngOnInit(): void {
      this.loginService.getAuth().subscribe(
        auth=>{
          if (auth) {
           this.route.navigate(['/']);         
          }
        }
      )
    }
    registro(){
       
      this.loginService.registrar(this.email,this.password).then(
        res=>{
          this.route.navigate(['/']);
          
        }
       
      ) .catch(error=>{
        /*   this.flashMessages.show(error.message,{
           cssClass:'alert-danger',timeout: 4000
          }) */
          
        }
        ) 
    }

}
