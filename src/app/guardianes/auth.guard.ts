import{ ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { observable } from 'rxjs';
import { audit, map } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private router:Router,
        private afAuth: AngularFireAuth
    ){
        
    }
    
    canActivate():Observable<boolean> {
        return  this.afAuth.authState.pipe(
            map(auth=>{
                if (!auth) {
                    this.router.navigate(['/login'])
                    return false;
                }else{
                    return true;
                }
            })
        )    
    }

}