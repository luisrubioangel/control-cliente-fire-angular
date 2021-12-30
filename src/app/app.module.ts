import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {environment} from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './components/cabecero/cabecero.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { LoginComponent } from './components/login/login.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { ClienteComponent } from './components/cliente/cliente.component';

import { AngularFireModule} from '@angular/fire/compat';
//import{} from '@angular/fire/compat/firestore'
import { AngularFirestoreModule,SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FormsModule} from '@angular/forms';
import { ClienteServicio } from './services/cliente.service';
import { LoginServicio } from './services/login.service';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionSErvicio } from './services/configuracio.service';



//import {FirestoreSettingsToken} from 'firebase/'


@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    TableroComponent,
    RegistroComponent,
    ConfiguracionComponent,
    NoEncontradoComponent,
    LoginComponent,
    PiePaginaComponent,
    EditarClienteComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase,'control-clientes'),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FlashMessagesModule.forRoot(),
    FormsModule
   // NgbModule
    
  ],
  providers: [ClienteServicio,
               LoginServicio,
              AuthGuard,
              ConfiguracionSErvicio,
              {provide:SETTINGS,useValue:{}}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
