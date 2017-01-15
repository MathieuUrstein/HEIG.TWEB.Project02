import { Component } from '@angular/core';
import { ConnectionService } from '../user/connection.service';

@Component({
   moduleId: module.id,
   selector: 'header-menu',
   templateUrl: 'headerMenu.html',
   styleUrls: ['headerMenu.css']
})
export class HeaderMenuComponent  {
   private isConnected: boolean = false;

   constructor(private connectionService: ConnectionService) {
      connectionService.isConnectedSource.subscribe(
         newState => {
            this.isConnected = newState;
         });
   }

   logout() {
      this.connectionService.logout();
   }
}
