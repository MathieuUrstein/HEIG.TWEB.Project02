import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(
      private connectionService: ConnectionService,
      private router: Router
   ) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.connectionService.getConnectionState()) {
         return true;
      }
      this.router.navigate(['connect']);
      return false;
   }
}
