import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'results',
   templateUrl: 'results.html',
   styleUrls: ['results.css']
})
export class ResultsComponent  {
   private title: string;
   private polls: Array<any>;

   constructor() {
      this.title = 'A title';
      this.polls = new Array(0);

      this.polls.push({
         type: 'single',
         question: 'This is the single choice question',
         answers: [{
            answer: 'Answer 1',
            correct: false,
            percent: 22
         }, {
            answer: 'Answer 2',
            correct: true,
            percent: 71
         }, {
            answer: 'Answer 3',
            correct: false,
            percent: 7
         }]
      });
      this.polls.push({
         type: 'multiple',
         question: 'This is multiple choices question',
         answers: [{
            answer: 'Answer 1',
            correct: false,
            percent: 45
         }, {
            answer: 'Answer 2',
            correct: true,
            percent: 37
         }, {
            answer: 'Answer 3',
            correct: true,
            percent: 18
         }]
      });
      this.polls.push({
         type: 'yesOrNo',
         question: 'This is the yes or no question',
         answers: [{
            answer: '',
            correct: true,
            percent: 55
         }]
      });
   }
}
