import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SuccessesService {

   successes: string[] = [];
   successesSubject = new BehaviorSubject<string[]>(this.successes);
   currentTimeOut: any = null;

   addSuccess(successes: string) {
      let tempSuccesses = this.successesSubject.getValue();
      // add successes only if not exists
      if (tempSuccesses.indexOf(successes) === -1) {
         tempSuccesses.push(successes);
      }

      this.successesSubject.next(tempSuccesses);

      if (this.currentTimeOut !== null) {
         clearTimeout(this.currentTimeOut);
      }
      this.currentTimeOut = setTimeout(() => {
         this.successesSubject.next([]);
      }, 5000);
   }

   addSuccesses(successes: string[]) {
      successes.forEach(success => {
         this.addSuccess(success);
      });
   }
}
