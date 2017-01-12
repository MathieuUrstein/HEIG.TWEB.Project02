import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Poll } from './edit/edit.component';

@Injectable()
export class ConnectionService {

   isConnectedSource = new BehaviorSubject(false);
   creationPolls: Array<Poll> = [];
   creationPollName: string = '';

   private setConnection(state: boolean) {
      this.isConnectedSource.next(state);
   }

   tryConnect() {
      this.setConnection(true);
   }

   getConnectionState() {
      return this.isConnectedSource.getValue();
   }
}
