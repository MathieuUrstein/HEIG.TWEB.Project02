import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ErrorsService {

   errors: string[] = [];
   errorsSubject = new BehaviorSubject<string[]>(this.errors);
   currentTimeOut: any = null;

   addError(error: string) {
      let tempErrors = this.errorsSubject.getValue();
      // add error only if not exists
      if (tempErrors.indexOf(error) === -1) {
         tempErrors.push(error);
      }

      this.errorsSubject.next(tempErrors);

      if (this.currentTimeOut !== null) {
         clearTimeout(this.currentTimeOut);
      }
      this.currentTimeOut = setTimeout(() => {
         this.errorsSubject.next([]);
      }, 5000);
   }

   addErrors (errors: string[]) {
      errors.forEach(error => {
         this.addError(error);
      });
   }
}
