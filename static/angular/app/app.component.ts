import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
   selector: 'app',
   template: `<router-outlet></router-outlet>`
})
export class AppComponent  {
   constructor() {
      let socket = io('http://localhost:3000');
      socket.emit('client-emission', {my: 'yoloooooooo'});
      socket.on('server-emission', (data: any) => {
         console.log(data);
      });
   }
}
