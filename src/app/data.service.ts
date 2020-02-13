import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

     constructor(private web: WebService) { }

     submitRating(rating: string, additional_info: string) {
          return this.web.post(`submitRating`, {
               rating: rating,
               additional_info: additional_info
          });
     }

     submitContact(name: string, email: string, message: string) {
          return this.web.post(`submitContact`, {
               name: name,
               email: email, 
               message: message
          });
     }
}
