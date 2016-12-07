import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'user',
   template: `
             <header-menu></header-menu>
             <connection *ngIf="!isConnected"></connection>
             <manage *ngIf="isConnected"></manage>
             `
})
export class UserComponent  {
   private isConnected: boolean;

   constructor() {
      this.isConnected = false;
   }

   public connect() {
      this.isConnected = true;
   }
}
