import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'share',
   templateUrl: 'share.html',
   styleUrls: [ 'share.css' ]
})
export class ShareComponent  {
   private shareIconTop: number = 60;
   private facebookClicked: boolean = false;
   private twitterClicked: boolean = false;
   private linkClicked: boolean = false;

   constructor() {
      this.clickRandomButton();
   }

   clickRandomButton() {
      setTimeout(() => {
         this.clickOne();
         this.clickRandomButton();
      }, 2500);
   }

   clickOne() {
      let random = Math.random();

      if(random < 0.33) {
         this.clickFacebook();
      } else if (random < 0.66) {
         this.clickTwitter();
      } else {
         this.clickLink();
      }
      this.bumpIcon();
   }

   clickFacebook() {
      this.facebookClicked = true;
      setTimeout(() => {
         this.facebookClicked = false;
      }, 300);
   }

   clickTwitter() {
      this.twitterClicked = true;
      setTimeout(() => {
         this.twitterClicked = false;
      }, 300);
   }

   clickLink() {
      this.linkClicked = true;
      setTimeout(() => {
         this.linkClicked = false;
      }, 300);
   }

   bumpIcon() {
      this.shareIconTop -= 40;

      setTimeout(() => {
         this.shareIconTop = 60;
      }, 500);
   }
}
