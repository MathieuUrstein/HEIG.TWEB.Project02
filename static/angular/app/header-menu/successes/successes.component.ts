import { Component } from '@angular/core';
import { SuccessesService } from './successes.service';

@Component({
   moduleId: module.id,
   selector: 'successes',
   templateUrl: 'successes.html',
   styleUrls: ['successes.css']
})
export class SuccessesComponent  {
   successes: any;

   constructor(private successesService: SuccessesService) {}

   ngOnInit() {
      this.successesService.successesSubject.subscribe(data => {
         this.successes = data;
      });
   }
}
