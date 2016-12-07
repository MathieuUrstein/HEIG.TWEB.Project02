import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'enjoy',
   templateUrl: 'enjoy.html',
   styleUrls: [ 'enjoy.css' ]
})
export class EnjoyComponent  {
   private nbNewVotes: number;
   private choosedQuestion: number;
   private questions: Array<number> = new Array(4);
   private questionsPercent: Array<number> = new Array(4);

   constructor() {
      this.randomVotes();
      this.randomQuestion();

      for (let i = 0; i < this.questions.length; i++) {
         let max = 500;
         this.questions[i] = Math.random() * max;
      }
      this.updateQuestions();

      this.addVotes();
   }

   updateQuestions() {
      let total = 0;

      for (let i = 0; i < this.questions.length; i++) {
         total += this.questions[i];
      }

      for (let i = 0; i < this.questions.length; i++) {
         this.questionsPercent[i] = ((this.questions[i] / total) * 100) + 20;
      }
   }

   addVotes() {
      setTimeout(() => {
         this.addBunchOfVotes();
         this.addVotes();
      }, 1250);
   }

   randomVotes() {
      this.nbNewVotes = Math.floor(Math.random() * 100 + 1);
   }

   randomQuestion() {
      this.choosedQuestion = Math.floor(Math.random() * 4);
   }

   addBunchOfVotes() {
      this.questions[this.choosedQuestion] += this.nbNewVotes;
      this.updateQuestions();
      this.randomVotes();
      this.randomQuestion();
   }
}


