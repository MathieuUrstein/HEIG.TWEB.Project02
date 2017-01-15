import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ConnectionService } from '../connection.service';
import {ErrorsService} from "../../header-menu/errors/errors.service";
import {SuccessesService} from "../../header-menu/successes/successes.service";

@Component({
   moduleId: module.id,
   selector: 'edit',
   templateUrl: 'edit.html',
   styleUrls: ['edit.css']
})
export class EditComponent  {
   private routeParams: Object;
   private id: string = null;
   private choiceMode: boolean = false;
   private name: string = '';
   private polls: Array<Poll> = [];
   private answerPopOver: AnswerPopOver = {
      visible: false,
      title: 'Are you sure to remove this answer ?',
      direction: 'right',
      poll: null,
      answer: null,
      position: {
         x: -1000,
         y: -1000
      }
   };
   private pollPopOver: PollPopOver = {
      visible: false,
      title: 'Are you sure to remove this question ?',
      direction: 'right',
      poll: null,
      position: {
         x: -1000,
         y: -1000
      }
   };
   private popOverPositionMargin: number = 20;
   private popOverHeight: number = 75;

   constructor(
      private route: ActivatedRoute,
      private connectionService: ConnectionService,
      private errorsService: ErrorsService,
      private successesService: SuccessesService,
      private router: Router
   ) {
      route.params.subscribe(params => {
         this.routeParams = params;
      });
   }

   ngOnInit() {
      this.connectionService.socket.on('polls-add-accepted', () => {
         console.log('polls-add-accepted');
         this.successesService.addSuccesses(['Your polls was successfully saved']);
         this.router.navigate(['/manage']);
      });

      this.connectionService.socket.on('polls-add-refused', (errors: Array<string>) => {
         console.log('polls-add-refused');
         this.errorsService.addErrors(errors);
      });

      this.connectionService.socket.on('polls-edit-accepted', () => {
         console.log('polls-edit-accepted');
         this.successesService.addSuccesses(['Your polls was successfully updated']);
         this.router.navigate(['/manage']);
      });

      this.connectionService.socket.on('polls-edit-refused', (errors: Array<string>) => {
         console.log('polls-edit-refused');
         this.errorsService.addErrors(errors);
      });

      this.connectionService.socket.on('polls-get-accepted', (polls: Polls) => {
         console.log('polls-get-accepted');
         this.name = polls.title;
         this.polls = polls.polls;
      });

      this.connectionService.socket.on('polls-get-refused', (errors: Array<string>) => {
         console.log('polls-get-refused');
         this.errorsService.addErrors(errors);
      });

      if (Object.keys(this.routeParams).length > 0) {
         this.id = this.routeParams['id'];
         this.connectionService.socket.emit('polls-get', this.id);
      } else {
         this.name = this.connectionService.creationPollName;
         this.polls = this.connectionService.creationPolls;
      }
   }

   ngOnDestroy() {
      this.connectionService.socket.off('polls-add-accepted');
      this.connectionService.socket.off('polls-add-refused');
      this.connectionService.socket.off('polls-edit-accepted');
      this.connectionService.socket.off('polls-edit-refused');
      this.connectionService.socket.off('polls-get-accepted');
      this.connectionService.socket.off('polls-get-refused');

      if (Object.keys(this.routeParams).length === 0) {
         this.connectionService.creationPolls = this.polls;
         this.connectionService.creationPollName = this.name;
      }
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

   addPoll(pollType: string) {
      if (pollType === 'yesOrNo') {
         this.polls.push({
            pollType: pollType,
            question: '',
            answers: [{
               answer: '',
               correct: true
            }]
         });
      } else { // two question for better user understanding
         this.polls.push({
            pollType: pollType,
            question: '',
            answers: [{
               answer: '',
               correct: true
            }, {
               answer: '',
               correct: false
            }]
         });
      }
      this.choiceMode = false;
   }

   removePoll(poll: Poll) {
      this.polls.splice(this.polls.indexOf(poll), 1);
   }

   askRemovePoll(poll: Poll, event: MouseEvent) {
      let elemPosition: any = this.cumulativeOffset(event.srcElement);

      this.pollPopOver.visible = true;
      this.pollPopOver.poll = poll;
      this.pollPopOver.position.x = elemPosition.left + this.popOverPositionMargin;
      this.pollPopOver.position.y = elemPosition.top - (this.popOverHeight / 2);
   }

   askRemoveAnswer(poll: Poll, answer: Answer, event: MouseEvent) {
      let elemPosition: any = this.cumulativeOffset(event.srcElement);

      this.answerPopOver.visible = true;
      this.answerPopOver.poll = poll;
      this.answerPopOver.answer = answer;
      this.answerPopOver.position.x = elemPosition.left + this.popOverPositionMargin;
      this.answerPopOver.position.y = elemPosition.top - (this.popOverHeight / 2);
   }

   removeAnswer(poll: Poll, answer: Answer) {
      poll.answers.splice(poll.answers.indexOf(answer), 1);

      if (poll.pollType === 'single') {
         let noTrue = true;
         for (let i = 0; i < poll.answers.length; i++) {
            if (poll.answers[i].correct) {
               noTrue = false;
            }
         }
         if (noTrue && poll.answers.length) {
            poll.answers[0].correct = true;
         }
      }
   }

   removePollPopOver() {
      this.pollPopOver.visible = false;
   }

   removeAnswerPopOver() {
      this.answerPopOver.visible = false;
   }

   singleSelect(poll: Poll, answer: Answer) {
      for (let i = 0; i < poll.answers.length; i++) {
         poll.answers[i].correct = false;
      }
      answer.correct = true;
   }

   multiSelect(answer: Answer) {
      answer.correct = !answer.correct;
   }

   yesNoSelect(answer: Answer, choice: boolean) {
      answer.correct = choice;
   }

   createOrEdit() {
      let polls: Polls = new Polls(this.id, this.name, this.polls);
      this.connectionService.socket.emit('polls-add-or-edit', polls);
   }
}

export class Polls {
   _id: string;
   title: string;
   polls: Array<Poll>;

   constructor(id: string, title: string, polls: Array<Poll>) {
      this._id = id; this.title = title; this. polls = polls;
   }
}

export interface Poll {
   pollType: string;
   question: string;
   answers: Array<Answer>;
}

interface Answer {
   answer: string;
   correct: boolean;
}

export interface PollPopOver {
   visible: boolean;
   title: string;
   direction: string;
   poll: Poll;
   position: {
      x: number,
      y: number
   };
}

export interface AnswerPopOver {
   visible: boolean;
   title: string;
   direction: string;
   poll: Poll;
   answer: Answer;
   position: {
      x: number,
      y: number
   };
}
