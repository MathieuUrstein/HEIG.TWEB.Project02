import { Component } from '@angular/core';
import {ErrorsService} from './errors.service';

@Component({
   moduleId: module.id,
   selector: 'errors',
   templateUrl: 'errors.html',
   styleUrls: ['errors.css']
})
export class ErrorsComponent  {
   errors: any;

   constructor(private errorsService: ErrorsService) {}

   ngOnInit() {
      this.errorsService.errorsSubject.subscribe(data => {
         this.errors = data;
      });
   }
}
