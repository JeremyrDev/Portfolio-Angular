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

     submitContact(name: string, email: string, message: string, additional_info) {
          return this.web.post(`submitContact`, {
               name: name,
               email: email, 
               message: message,
               additional_info 
          });
     }

     newVisitor(ip: string)
     {
          return this.web.get(`newVisitor/${ip}`);
     }

     viewedResume(ip: string) {
          return this.web.get(`viewedResume/${ip}`);
     }

     getIP()
     {
          return this.web.custom('https://api.ipify.org/?format=json');
     }

     spin(text)
     {
          return this.web.post(`spintax/`, {
               spin: text
          });
     }

     getLeads(latlon, radius) {
          return this.web.post(`leads`, {
               latlon: latlon,
               radius: radius
          });
     }
}
