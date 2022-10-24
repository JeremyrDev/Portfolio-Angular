import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  constructor(private _sanitizer: DomSanitizer, private data: DataService) { }

  alreadySent: boolean = false;
  sendAnyway: boolean = false;

  responseText: string = "";

  name: string = "";
  email: string = "";
  message: string = "";
  ipMain: string = "";

  jquery: any; 
  $: any;

  ngOnInit() {
    this.GetNewVisitor();
  }

  GetNewVisitor()
  {
    this.data.getIP().subscribe((response) => {
      let ip = JSON.stringify(response['ip']).replace(/\"/g, '');
      this.ipMain = ip;
    });
  }

  submit(name, email, message)
  {
      if(name == "" || email == "" || message == "")
      {
            //Update UI elements
            (document.querySelector('.contact') as HTMLElement).style.marginTop = '50px';
            this.responseText = "<b class='text-danger'>Make sure all fields are filled out before sending!</b>";
            (document.querySelector('.response-text') as HTMLElement).style.opacity = '1';


            return;
      }
      if(email != "")
      {
            if (!this.validateEmail(email))
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
            if(this.name == name && this.email == email && this.message == message && !this.sendAnyway)
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
      this.name = name;
      this.email = email;
      this.message = message;

      //Sanitize incoming data for security
      let safeName = this._sanitizer.sanitize(SecurityContext.HTML, name);
      let safeEmail = this._sanitizer.sanitize(SecurityContext.HTML, email);
      let safeMessage = this._sanitizer.sanitize(SecurityContext.HTML, message);
      
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

                      this.responseText = "<b class='text-primary'>Message Sent!</b><br>I'll respond within 1 business day, Thank you!<br><i class='far fa-smile-beam'></i>";
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
