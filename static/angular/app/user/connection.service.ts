import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Poll } from './edit/edit.component';
import { ErrorsService } from '../header-menu/errors/errors.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import {SuccessesService} from '../header-menu/successes/successes.service';

@Injectable()
export class ConnectionService {

   isConnectedSource = new BehaviorSubject<boolean>(false);
   creationPolls: Array<Poll> = [];
   creationPollName: string = '';
   socket = io('http://localhost:3000');
   needActivation: boolean = false;

   constructor(
      private errorsService: ErrorsService,
      private successesService: SuccessesService,
      private router: Router
   ) {
      this.socket.on('register-accepted', () => {
         console.log('register-accepted');
         this.successesService.addSuccesses(['Successfully registered']);

         if (this.router.url === '/connect') {
            this.router.navigate(['/manage']);
         }

         this.setConnection(true);
      });

      this.socket.on('register-refused', (errors: Array<string>) => {
         console.log('register-refused');

         this.errorsService.addErrors(errors);
         this.setConnection(false);
      });

      this.socket.on('connection-accepted', () => {
         console.log('connection-accepted');

         if (this.router.url === '/connect') {
            this.successesService.addSuccesses(['Successfully connected']);
            this.router.navigate(['/manage']);
         }

         this.setConnection(true);
      });

      this.socket.on('connection-not-connected', (errors: Array<string>) => {
         console.log('connection-not-connected');

         if (this.needActivation) {
            this.errorsService.addErrors(errors);
            this.router.navigate(['/connect']);
         }
         this.setConnection(false);
      });

      this.socket.on('connection-refused', (errors: Array<string>) => {
         console.log('connection-refused');
         this.errorsService.addErrors(errors);
         this.router.navigate(['/connect']);

         this.setConnection(false);
      });

      this.getConnectionState(false);
   }

   private setConnection(connected: boolean) {
      this.isConnectedSource.next(connected);
   }

   connectionState() {
      this.socket.emit('connection-state');
   }

   tryConnect(connectionData: any) {
      this.socket.emit('connection-try', connectionData);
   }

   tryRegister(registerData: any) {
      this.socket.emit('register', registerData);
   }

   getConnectionState(needActivation: boolean) {
      this.needActivation = needActivation;
      this.connectionState();
      return this.isConnectedSource.getValue();
   }

   logout() {
      this.socket.emit('connection-terminated');
      this.setConnection(false);
   }
}
