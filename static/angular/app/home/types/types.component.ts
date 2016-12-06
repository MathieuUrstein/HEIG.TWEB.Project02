import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'types',
   templateUrl: 'types.html',
   styleUrls: [ 'types.css' ]
})
export class TypesComponent  {
   private types = new Array(3);
   private presentedType;

   constructor() {
      this.types = [ 'Single choice', 'Multiple Choices', 'Yes or No'];
      this.presentedType = 0;
      this.loopPresentedType();
   }

   loopPresentedType() {
      setTimeout(() => {
         this.presentedType = (this.presentedType + 1) % this.types.length;
         this.loopPresentedType();
      }, 2500);
   }
}
