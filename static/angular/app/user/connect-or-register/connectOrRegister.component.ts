import { Component } from '@angular/core';
import { ConnectionService } from '../connection.service';
import {ErrorsService} from '../../header-menu/errors/errors.service';

@Component({
   moduleId: module.id,
   selector: 'connect-or-register',
   templateUrl: 'connectOrRegister.html',
   styleUrls: ['connectOrRegister.css']
})
export class ConnectOrRegisterComponent  {
   fullName: string = '';
   email: string = '';
   password: string = '';
   passwordRepeat: string = '';
   stayConnected: boolean = true;

   constructor(
      private connectionService: ConnectionService,
      private errorsService: ErrorsService
   ) {}

   tryConnect() {
      this.connectionService.tryConnect({
         email: this.email,
         password: this.password,
         stayConnected: this.stayConnected
      });
   }

   tryRegister() {
      if (this.password !== this.passwordRepeat) {
         this.errorsService.addError('Your passwords don\'t match');
      } else {
         this.connectionService.tryRegister({
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            stayConnected: this.stayConnected
         });
      }
   }

   changeStayConnected() {
      this.stayConnected = !this.stayConnected;
   }
}
