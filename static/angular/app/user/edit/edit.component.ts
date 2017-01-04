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
   private choiceMode: boolean = false;
   private name: string = '';
   private polls: Array<Poll> = new Array(0);
   private answerPopOver: AnswerPopOver = {
      visible: false,
      title: 'Are you shure to remove this answer ?',
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
      title: 'Are you shure to remove this question ?',
      direction: 'right',
      poll: null,
      position: {
         x: -1000,
         y: -1000
      }
   };
   private popOverPositionMargin: number = 20;
   private popOverHeight: number = 75;

   constructor(private route: ActivatedRoute) {

      let paramsSource: Observable<Params> = route.params;

      if (paramsSource) {
         paramsSource.subscribe(params => {
            this.name = params['id'];
         });
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

   addPoll(type: string) {
      if (type === 'yesOrNo') {
         this.polls.push({
            type: type,
            question: '',
            answers: [{
               answer: '',
               correct: true
            }]
         });
      } else {
         this.polls.push({
            type: type,
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
      console.log(poll, answer);
      poll.answers.splice(poll.answers.indexOf(answer), 1);

      if (poll.type === 'single') {
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
}

interface Poll {
   type: string;
   question: string;
   answers: Array<Answer>;
}

interface Answer {
   answer: string;
   correct: boolean;
}

interface PollPopOver {
   visible: boolean;
   title: string;
   direction: string;
   poll: Poll;
   position: {
      x: number,
      y: number
   };
}

interface AnswerPopOver {
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
