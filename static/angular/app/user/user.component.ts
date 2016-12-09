import { Component } from '@angular/core';
import { ConnectionService } from './connection.service';

@Component({
   moduleId: module.id,
   selector: 'user',
   template: `
             <header-menu></header-menu>
             <connect-or-register *ngIf="!isConnected"></connect-or-register>
             <manage *ngIf="isConnected"></manage>
             `
})
export class UserComponent  {
   private isConnected: boolean;

   constructor(private connectionService: ConnectionService) {
      this.isConnected = connectionService.getConnectionState();
      connectionService.isConnectedSource.subscribe(
         newState => {
            this.isConnected = newState;
      });
   }
}
