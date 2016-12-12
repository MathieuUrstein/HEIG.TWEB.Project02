import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'participate',
   templateUrl: 'participate.html',
   styleUrls: ['participate.css']
})
export class ParticipateComponent  {
   private title: string = 'A title';
   private polls: Array<any> = new Array(0);

   constructor() {

      this.polls.push({
         type: 'single',
         question: 'This is the single choice question',
         answers: [{
            answer: 'Answer 1',
            correct: false
         }, {
            answer: 'Answer 2',
            correct: true
         }, {
            answer: 'Answer 3',
            correct: false
         }]
      });
      this.polls.push({
         type: 'multiple',
         question: 'This is multiple choices question',
         answers: [{
            answer: 'Answer 1',
            correct: false
         }, {
            answer: 'Answer 2',
            correct: true
         }, {
            answer: 'Answer 3',
            correct: true
         }]
      });
      this.polls.push({
         type: 'yesOrNo',
         question: 'This is the yes or no question',
         answers: [{
            answer: 'Answer 1',
            correct: true
         }]
      });
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
