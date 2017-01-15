import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(
      private connectionService: ConnectionService
   ) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      this.connectionService.getConnectionState(true)
      return true;
   }
}
