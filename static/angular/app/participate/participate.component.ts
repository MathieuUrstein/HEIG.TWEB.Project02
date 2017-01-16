import { Component } from '@angular/core';
import {Poll, Polls} from '../user/edit/edit.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectionService} from '../user/connection.service';
import {ErrorsService} from '../header-menu/errors/errors.service';
import {SuccessesService} from '../header-menu/successes/successes.service';

@Component({
   moduleId: module.id,
   selector: 'participate',
   templateUrl: 'participate.html',
   styleUrls: ['participate.css']
})
export class ParticipateComponent  {
   private routeParams: Object;
   private id: string = null;
   private title: string = '';
   private polls: Array<Poll> = [];

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
      if (Object.keys(this.routeParams).length > 0) {
         this.id = this.routeParams['id'];
         this.connectionService.socket.emit('polls-get-participate', this.id);
      }

      this.connectionService.socket.on('polls-get-participate-accepted', (polls: Polls) => {
         console.log('polls-get-participate-accepted');
         this.title = polls.title;
         this.polls = polls.polls;
      });

      this.connectionService.socket.on('polls-get-participate-refused', (errors: Array<string>) => {
         console.log('polls-get-participate-refused');
         this.errorsService.addErrors(errors);
      });

      this.connectionService.socket.on('polls-add-answers-accepted', (successes: Array<string>) => {
         console.log('polls-add-answers-accepted');
         this.successesService.addSuccesses(successes);
         this.router.navigate(['/r/' + this.id]);
      });

      this.connectionService.socket.on('polls-add-answers-refused', (errors: Array<string>) => {
         console.log('polls-add-answers-refused');
         this.errorsService.addErrors(errors);
      });
   }

   ngOnDestroy() {
      this.connectionService.socket.off('polls-get-participate-accepted');
      this.connectionService.socket.off('polls-get-participate-refused');
      this.connectionService.socket.off('polls-add-answers-accepted');
      this.connectionService.socket.off('polls-add-answers-refused');
   }

   sendAnswers() {
      let answeredPolls: any = {
         id: this.id,
         polls: this.polls
      };
      console.log(answeredPolls);
      this.connectionService.socket.emit('polls-add-answers', answeredPolls);
   }

   singleSelect(poll: any, answer: any) {
      for (let i = 0; i < poll.answers.length; i++) {
         poll.answers[i].correct = false;
      }
      answer.correct = true;
      poll.answered = true;
   }

   multiSelect(poll: any, answer: any) {
      answer.correct = !answer.correct;
      poll.answered = true;
   }

   yesNoSelect(poll: any, answer: any, choice: boolean) {
      answer.correct = choice;
      poll.answered = true;
   }
}
