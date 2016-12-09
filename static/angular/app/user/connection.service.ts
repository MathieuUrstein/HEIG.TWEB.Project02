import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ConnectionService {

   isConnectedSource = new BehaviorSubject(false);

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
