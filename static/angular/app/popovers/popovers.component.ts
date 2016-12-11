import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'popovers',
   templateUrl: 'popovers.html',
})
export class PopOversComponent  {
   private popovers: Array<PopOver>;

   constructor() {
      this.popovers = new Array(0);
   }
}

interface PopOver {
   title: string;
   content: string;
   position: {
      x: number,
      y: number
   };
}
