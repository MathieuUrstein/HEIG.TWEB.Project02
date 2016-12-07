import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'make',
   templateUrl: 'make.html',
   styleUrls: [ 'make.css' ]
})
export class MakeComponent  {
   private isVisible: Array<Boolean> = new Array(4);
   private addClicked: Boolean;
   private removeClicked: Boolean;

   constructor() {
      this.isVisible[0] = true;
      this.addClicked = false;
      this.removeClicked = false;
      for (let i = 1; i < this.isVisible.length; i++) {
         this.isVisible[i] = false;
      }
      this.addOrRemove();
   }
   addOrRemove() {
      setTimeout(() => {
         this.addOrRemoveOne();
         this.addOrRemove();
      }, 2500);
   }
   addOrRemoveOne() {
      let allRemoved = true;
      let allAdded = true;

      for (let i = 0; i < this.isVisible.length; i++) {
         if (this.isVisible[i]) {
            allRemoved = false;
         } else {
            allAdded = false;
         }
      }

      if (allRemoved) {
         this.addOne();
      } else if (allAdded) {
         this.removeOne();
      } else {
         Math.random() < 0.6 ? this.addOne() : this.removeOne();
      }
   }

   addOne() {
      for (let i = 0; i < this.isVisible.length; i++) {
         if (!this.isVisible[i]) {
            this.isVisible[i] = true;
            break;
         }
      }
      this.clickAdd();
   }

   removeOne() {
      for (let i = 0; i < this.isVisible.length; i++) {
         if (this.isVisible[i]) {
            this.isVisible[i] = false;
            break;
         }
      }
      this.clickRemove();
   }

   clickAdd() {
      this.addClicked = true;
      setTimeout(() => {
         this.addClicked = false;
      }, 300);
   }

   clickRemove() {
      this.removeClicked = true;
      setTimeout(() => {
         this.removeClicked = false;
      }, 300);
   }
}
