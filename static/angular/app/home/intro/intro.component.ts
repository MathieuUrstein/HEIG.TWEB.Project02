import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'intro',
   templateUrl: 'intro.html',
   styleUrls: [ 'intro.css' ]
})
export class IntroComponent {
   private l_el: Array<String> = new Array(12);
   private r_el: Array<String> = new Array(12);

   constructor() {
      this.newWidth(this.l_el);
      this.newWidth(this.r_el);
      this.loopNewWidth(this.l_el);
      this.loopNewWidth(this.r_el);
   }

   loopNewWidth(array: Array<String>) {
      setTimeout(() => {
         this.newWidth(array);
         this.loopNewWidth(array);
      }, 5000);
   }

   newWidth(array: Array<String>) {
      let min = 1;
      let max = 30;

      for (let i = 0; i < array.length; i++) {
         array[i] = (Math.random() * (max - min) + min) + '%';
      }
   }
}
