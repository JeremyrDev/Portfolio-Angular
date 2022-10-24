import { Injectable } from '@angular/core';
import { WorkItem } from './models/work-item';
import { WebService } from './web.service';
import workItems from '../assets/work-items.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

     constructor(private web: WebService) { 
          this.loadWorkItems();
     }

     public showWorkModal: boolean = false;
     public selectedWorkItem: number;
     public workItems: WorkItem[] = [];

     ngOnInit() {
          
     }

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

     loadWorkItems()
     {
          for(var i = 0; i < workItems.items.length; i++)
               this.workItems.push(new WorkItem(workItems.items[i]));
     }

     ShowWorkModal(itemIndex: number)
     {
          this.selectedWorkItem = itemIndex;
          this.showWorkModal = true;
          
          setTimeout(() => {

               document.getElementById("work-modal").style.width = this.GetScreenWidth();
               document.getElementById("work-modal").style.opacity = "1";
               document.getElementById("modal-container").style.opacity = "1";
          }, 50);
     }

     CloseWorkModal()
     {
          document.getElementById("work-modal").style.width = "25%";
          document.getElementById("work-modal").style.opacity = "0";
          document.getElementById("modal-container").style.opacity = "0";
          
          setTimeout(() => {
               this.showWorkModal = false;
          }, 200);
     }

     GetScreenWidth()
     {
          console.log(window.innerWidth);
          if(window.innerWidth < 1000)
          {
               if(window.innerWidth < 500)
               {
                    return "90%";
               }
               else
                    return "75%";
          }
          else
               return "55%";
     }
}
