import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../data.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

     constructor(private _sanitizer: DomSanitizer, private data: DataService) { }

     alreadySent: boolean = false;
     sendAnyway: boolean = false;

     ipMain: string = "";

     name: string = "";
     email: string = "";
     message: string = "";

     responseText: string = "";

     ngOnInit() {

          this.data.getIP().subscribe((response) => {

               // console.log("IP: " + JSON.stringify(response['ip']));
               let ip = JSON.stringify(response['ip']).replace(/\"/g, '');
               this.ipMain = ip;
               // this.data.newVisitor(ip).subscribe((response) => {
               //      //Save the value of "visited" to the current date and time. 
               // });
          });

     }

     submit(n, e, m)
     {
          if(n == "" || e == "" || m == "")
          {
               //Update UI elements
               (document.querySelector('.contact') as HTMLElement).style.marginTop = '50px';
               this.responseText = "<b class='text-danger'>Make sure all fields are filled out before sending!</b>";
               (document.querySelector('.response-text') as HTMLElement).style.opacity = '1';


               return;
          }
          if(e != "")
          {
               if (!this.validateEmail(e))
               {
                    //Update UI elements
                    (document.querySelector('.contact') as HTMLElement).style.marginTop = '50px';
                    this.responseText = "<b class='text-danger'>Make sure to use a valid email!</b>";
                    (document.querySelector('.response-text') as HTMLElement).style.opacity = '1';
                    return;
               }
          }
          if(this.alreadySent)
          {
               if(this.name == n && this.email == e && this.message == m && !this.sendAnyway)
               {
                    (document.querySelector('.btn-custom') as HTMLElement).innerHTML = "Yes, Send Again!";

                    this.responseText = "<b class='text-warning'>Are you sure you want to send this again?</b>";

                    this.sendAnyway = true;
                    return;
               }
          }

          //Update UI elements
          (document.querySelector('.contact') as HTMLElement).style.marginTop = '50px';

          //Set variables for validation
          this.name = n;
          this.email = e;
          this.message = m;

          //Sanitize incoming data for security
          let safeName = this._sanitizer.sanitize(SecurityContext.HTML, n);
          let safeEmail = this._sanitizer.sanitize(SecurityContext.HTML, e);
          let safeMessage = this._sanitizer.sanitize(SecurityContext.HTML, m);
          
          //Delay just for UI reasons
          setTimeout(() => {
               //Update UI elements
               this.responseText = "Sending...";
               (document.querySelector('.response-text') as HTMLElement).style.opacity = '1';

               //submit contact info to database
               this.data.submitContact(safeName, safeEmail, safeMessage, this.ipMain).subscribe((response) => {
                    console.log("Contacted! : " + JSON.stringify(response));

                    (document.querySelector('.btn-custom') as HTMLElement).innerHTML = "Send Message!";

                    if(response['response'] == "Success")
                    {
                         this.alreadySent = true;
                         this.sendAnyway = false;

                         $('#name-input').val("");
                         $('#email-input').val("");
                         $('#message-input').val("");

                         this.responseText = "<b class='text-custom'>Message Sent!</b><br>I'll respond within 1 business day, Thank you!<br><i class='far fa-smile-beam'></i>";
                    }
               });
          }, 250);
     }

     validateEmail(email) 
     {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
     }
}
