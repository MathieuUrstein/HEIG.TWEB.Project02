import { Component } from '@angular/core';
import { ConnectionService } from '../user/connection.service';

@Component({
   moduleId: module.id,
   selector: 'header-menu',
   templateUrl: 'headerMenu.html',
   styleUrls: ['headerMenu.css']
})
export class HeaderMenuComponent  {
   private isConnected: boolean;

   constructor(private connectionService: ConnectionService) {
      this.isConnected = connectionService.getConnectionState();
      connectionService.isConnectedSource.subscribe(
         newState => {
            this.isConnected = newState;
         });
   }
}
