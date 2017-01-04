import { Component } from '@angular/core';
import { ConnectionService } from '../connection.service';
import {Router} from '@angular/router';

@Component({
   moduleId: module.id,
   selector: 'connect-or-register',
   templateUrl: 'connectOrRegister.html',
   styleUrls: ['connectOrRegister.css']
})
export class ConnectOrRegisterComponent  {
   constructor(
      private connectionService: ConnectionService,
      private router: Router
   ) {}

   tryConnect() {
      this.connectionService.tryConnect();
      this.router.navigate(['manage']);
   }
}
