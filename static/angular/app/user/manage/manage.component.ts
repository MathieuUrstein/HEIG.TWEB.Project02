import {Component, ViewChildren, QueryList, ElementRef} from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'manage',
   templateUrl: 'manage.html',
   styleUrls: ['manage.css']
})
export class ManageComponent  {
   private polls: Array<Poll> = new Array<Poll>(0);
   private baseUrl: string;

   @ViewChildren('pollsView') pollsView: QueryList<ElementRef>;

   constructor() {
      this.baseUrl = window.location.origin + /p/;

      this.polls.push({
         title: 'A random title',
         id: 'asdew3r32ref2',
         share: false,
         titleHovered: false
      });
      this.polls.push({
         title: 'Another random title',
         id: '23rio2nr4',
         share: false,
         titleHovered: false
      });
      this.polls.push({
         title: 'Hmm no more ideas',
         id: '3d23f4',
         share: false,
         titleHovered: false
      });
      this.polls.push({
         title: 'That\'s quite an interseting and long title just for a poll',
         id: '3r2r3',
         share: false,
         titleHovered: false
      });
   }

   getViewCopyInput(poll: Poll) {
      return this.pollsView.find((a: ElementRef) => {
         return a.nativeElement.id === poll.id;
      });
   }

   showLink(poll: Poll) {
      poll.share = !poll.share;
      let thePollViewElement: ElementRef = this.getViewCopyInput(poll);
      setTimeout(() => {
         thePollViewElement.nativeElement.select();
      }, 1000);
   }

   copyPollToClipBoard(poll: Poll) {
      let thePollViewElement: ElementRef = this.getViewCopyInput(poll);
      thePollViewElement.nativeElement.select();
      document.execCommand('copy');
   }

   sanitizeURI(base: string) {
      return encodeURI(base);
   }
}

interface Poll {
   title: string;
   id: string;
   share: boolean;
   titleHovered: boolean;
}
