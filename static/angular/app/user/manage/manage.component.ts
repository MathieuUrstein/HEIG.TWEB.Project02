import {Component, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {ConnectionService} from '../connection.service';
import {ErrorsService} from "../../header-menu/errors/errors.service";

@Component({
   moduleId: module.id,
   selector: 'manage',
   templateUrl: 'manage.html',
   styleUrls: ['manage.css']
})
export class ManageComponent  {
   private polls: Array<SimplifiedPolls> = [];
   private baseUrl: string;

   @ViewChildren('pollsView') pollsView: QueryList<ElementRef>;

   constructor(
      private connectionService: ConnectionService,
      private errorsService: ErrorsService
   ) {
      this.baseUrl = window.location.origin + /p/;
   }

   ngOnInit() {
      this.connectionService.socket.on('polls-simplified-accepted', (polls: Array<SimplifiedPolls>) => {
         console.log('polls-simplified-accepted');
         this.polls = polls;
      });

      this.connectionService.socket.on('polls-simplified-refused', (errors: Array<string>) => {
         console.log('polls-simplified-refused');
         this.errorsService.addErrors(errors);
      });

      this.connectionService.socket.emit('polls-simplified');
   }

   ngOnDestroy() {
      this.connectionService.socket.off('polls-simplified-accepted');
      this.connectionService.socket.off('polls-simplified-refused');
   }

   getViewCopyInput(poll: SimplifiedPolls) {
      return this.pollsView.find((a: ElementRef) => {
         return a.nativeElement.id === poll.id;
      });
   }

   showLink(poll: SimplifiedPolls) {
      poll.share = !poll.share;
      let thePollViewElement: ElementRef = this.getViewCopyInput(poll);
      setTimeout(() => {
         thePollViewElement.nativeElement.select();
      }, 1000);
   }

   copyPollToClipBoard(poll: SimplifiedPolls) {
      let thePollViewElement: ElementRef = this.getViewCopyInput(poll);
      thePollViewElement.nativeElement.select();
      document.execCommand('copy');
   }

   sanitizeURI(base: string) {
      return encodeURI(base);
   }
}

interface SimplifiedPolls {
   title: string;
   id: string;
   share: boolean;
   titleHovered: boolean;
}
