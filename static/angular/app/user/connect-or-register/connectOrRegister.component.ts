import { Component } from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
   moduleId: module.id,
   selector: 'connect-or-register',
   templateUrl: 'connectOrRegister.html',
   styleUrls: ['connectOrRegister.css']
})
export class ConnectOrRegisterComponent  {
   constructor(private connectionService: ConnectionService) {}

   tryConnect() {
      this.connectionService.tryConnect();
   }
}
