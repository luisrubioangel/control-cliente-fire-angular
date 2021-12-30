import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { FlashMessagesComponent } from 'angular2-flash-messages';
import { LoginServicio } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(private route:Router,
             // private flashMessages:FlashMessagesComponent,
              private loginService:LoginServicio) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth=>{
        if (auth) {
         this.route.navigate(['/']);         
        }
      }
    )
  }
  login(){
     this.loginService.login(this.email,this.password).then(
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
