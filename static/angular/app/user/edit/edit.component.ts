import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
   moduleId: module.id,
   selector: 'edit',
   templateUrl: 'edit.html',
   styleUrls: ['edit.css']
})
export class EditComponent  {
   private choiceMode: boolean;
   private name: string;
   private polls: Array<any>;

   constructor(private route: ActivatedRoute) {
      this.choiceMode = false;
      this.name = '';
      this.polls = new Array(0);

      let paramsSource: Observable<Params> = route.params;

      if (paramsSource) {
         paramsSource.subscribe(params => {
            this.name = params['id'];
         });
      }
   }

   addPoll(type: string) {
      this.polls.push({
         type: type,
         question: '',
         answers: [{
            answer: '',
            correct: true
         }]
      });
      this.choiceMode = false;
   }

   removeAnswer(poll: any, answer: any) {
      poll.answers.splice(poll.answers.indexOf(answer), 1);

      if (poll.type === 'single') {
         let noTrue = true;
         for (let i = 0; i < poll.answers.length; i++) {
            if (poll.answers[i].correct) {
               noTrue = false;
            }
         }
         if (noTrue) {
            poll.answers[0].correct = true;
         }
      }
   }

   singleSelect(poll: any, answer: any) {
      for (let i = 0; i < poll.answers.length; i++) {
         poll.answers[i].correct = false;
      }
      answer.correct = true;
   }

   multiSelect(answer: any) {
      answer.correct = !answer.correct;
   }

   yesNoSelect(answer: any, choice: boolean) {
      answer.correct = choice;
   }
}
