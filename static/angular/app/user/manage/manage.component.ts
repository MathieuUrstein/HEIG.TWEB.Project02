import {Component, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {ConnectionService} from '../connection.service';
import {ErrorsService} from '../../header-menu/errors/errors.service';

@Component({
   moduleId: module.id,
   selector: 'manage',
   templateUrl: 'manage.html',
   styleUrls: ['manage.css']
})
export class ManageComponent  {
   private polls: Array<SimplifiedPoll> = [];
   private baseUrl: string;
   private popOverPositionMargin: number = 20;
   private popOverHeight: number = 75;
   private pollPopOver: PollPopOver = {
      visible: false,
      title: 'Are you sure to remove these polls ?',
      direction: 'right',
      poll: null,
      position: {
         x: -1000,
         y: -1000
      }
   };

   @ViewChildren('pollsView') pollsView: QueryList<ElementRef>;

   constructor(
      private connectionService: ConnectionService,
      private errorsService: ErrorsService
   ) {
      this.baseUrl = window.location.origin + /p/;
   }

   ngOnInit() {
      this.connectionService.socket.on('polls-simplified-accepted', (polls: Array<SimplifiedPoll>) => {
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

   getViewCopyInput(poll: SimplifiedPoll) {
      return this.pollsView.find((a: ElementRef) => {
         return a.nativeElement.id === poll.id;
      });
   }

   showLink(poll: SimplifiedPoll) {
      poll.share = !poll.share;
      let thePollViewElement: ElementRef = this.getViewCopyInput(poll);
      setTimeout(() => {
         thePollViewElement.nativeElement.select();
      }, 1000);
   }

   copyPollToClipBoard(poll: SimplifiedPoll) {
      let thePollViewElement: ElementRef = this.getViewCopyInput(poll);
      thePollViewElement.nativeElement.select();
      document.execCommand('copy');
   }

   sanitizeURI(base: string) {
      return encodeURI(base);
   }

   askRemovePoll(poll: SimplifiedPoll, event: MouseEvent) {
      let elemPosition: any = this.cumulativeOffset(event.srcElement);
      this.pollPopOver.visible = true;
      this.pollPopOver.poll = poll;
      this.pollPopOver.position.x = elemPosition.left + this.popOverPositionMargin;
      this.pollPopOver.position.y = elemPosition.top - (this.popOverHeight / 2);
   }

   removePollPopOver() {
      this.pollPopOver.visible = false;
      this.pollPopOver.position.x = -1000;
      this.pollPopOver.position.y = -1000;
   }

   cumulativeOffset(element: Element) {
      let top = 0, left = 0;
      let htmlElement = <HTMLElement>element;
      do {
         top += htmlElement.offsetTop  || 0;
         left += htmlElement.offsetLeft || 0;

         htmlElement = <HTMLElement>htmlElement.offsetParent;

      } while (htmlElement);

      return {
         top: top,
         left: left
      };
   };

   removePoll(poll: SimplifiedPoll) {
      console.log(poll);
   }
}

interface SimplifiedPoll {
   title: string;
   id: string;
   share: boolean;
   titleHovered: boolean;
}
export interface PollPopOver {
   visible: boolean;
   title: string;
   direction: string;
   poll: SimplifiedPoll;
   position: {
      x: number,
      y: number
   };
}
