import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';

import * as $ from 'jquery';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
     selector: 'app-home',
     templateUrl: './home.component.html',
     styleUrls: ['./home.component.scss'],
     encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

     headerContentFade : boolean = false;

     constructor(private data: DataService, private router: Router) { }

     star : Number[] = [0, 0, 0, 0, 0];
     ratedValue : Number[] = [0, 0, 0, 0, 0];

     plainRating: Number = 0;
     
     ipMain: string = "";

     rated : boolean = false;                     

     rateResponseText: string = "";

     ngOnInit() 
     {
          if(window.localStorage.getItem("rating"))
          {
               // console.log("Saved Rating: "+window.localStorage.getItem("rating"));
               this.plainRating = Number(window.localStorage.getItem("rating"));
               this.rate(Number(window.localStorage.getItem("rating")) - 1, true);
          }

          // window.addEventListener('scroll', this.scroll, true);

          // $(function () {
          //      ($('[data-toggle="popover"]') as any).popover({
          //           html: true
          //      })
          // })




          //Check if the visited item in local storage exists, then check the time since the last visited time
          //If time is longer than 5 minutes then update again
          this.data.getIP().subscribe((response) => {

               // console.log("IP: " + JSON.stringify(response));
               let ip = JSON.stringify(response['ip']).replace(/\"/g, '');
               this.ipMain = ip;

               this.data.newVisitor(ip).subscribe((response) => {
                    //Save the value of "visited" to the current date and time. 
               });
               
          });
          
     }

     ngOnDestroy() {
          // window.removeEventListener('scroll', this.scroll, true);
     }

     ngAfterViewInit() {
          (document.querySelector('.stars-container') as HTMLElement).style.marginTop = '10px';
     }

     // scroll = (event: any): void => {

     //      const number = event.srcElement.scrollingElement.scrollTop;

     //      if(number >= 550)
     //      {
     //           this.headerContentFade = true;
     //      }
     //      else 
     //           this.headerContentFade = false;
     // };

     hover(index)
     {
          switch(index)
          {
               case 0:
                    this.star = [1, 0, 0, 0, 0];
                    break;
               case 1:
                    this.star = [1, 1, 0, 0, 0];
                    break;
               case 2:
                    this.star = [1, 1, 1, 0, 0];
                    break;
               case 3:
                    this.star = [1, 1, 1, 1, 0];
                    break;
               case 4:
                    this.star = [1, 1, 1, 1, 1];
                    break;
          }
     }

     leave(index)
     {
          if(this.rated)
          {
               this.star = this.ratedValue;
               return;
          }

          if(index == -1)
          {
               this.star = [0, 0, 0, 0, 0];
          }
     }

     rate(index, alreadyRated = false)
     {
          this.rated = true;

          setTimeout(() => { if (index >= 4) this.star[4] = 2; else this.star[4] = 0; }, 0);
          setTimeout(() => { if (index >= 3) this.star[3] = 2; else this.star[3] = 0; }, 50);
          setTimeout(() => { if (index >= 2) this.star[2] = 2; else this.star[2] = 0; }, 100);
          setTimeout(() => { if (index >= 1) this.star[1] = 2; else this.star[1] = 0; }, 150);
          setTimeout(() => { if (index >= 0) this.star[0] = 2; else this.star[0] = 0; }, 200);

          this.ratedValue = this.star;

          this.rateResponseText = "<br><span class='rating-value'>" + (index == 4 ? "Wow! ": "") + "You rated it " + (index + 1) + " stars!</span>";
          
          //save rating value to local storage and load it on page load
          window.localStorage.setItem("rating", index + 1);

          if(alreadyRated || (this.rated && (this.plainRating == index + 1)))
          {
               this.rated = true;
               return;
          }

          this.plainRating = index + 1;

          //save rating to mongodb
          // console.log("Submitting: "+(index+1) + "::"+this.ipMain);
          this.data.submitRating(index + 1, this.ipMain).subscribe((response) => {
                    // console.log("Rating Submitted: "+JSON.stringify(response));

               // this.rateResponseText += "<br> <span class='rating-average'> The average rating is " + response['average_rating'].toFixed(1) + "</span>";
          });
     }

     leavePopover()
     {
          
     }

     nav(page)
     {
          switch(page)
          {
               case 0:
                    this.router.navigate(['/baseline']);
                    window.location.reload();
               break;
          }
     }

     resume()
     {
          this.data.viewedResume(this.ipMain).subscribe((response) => {
               //Save the value of "visited" to the current date and time. 
          });
          window.open('/assets/Michaels_Resume.pdf', '_blank');
     }

     goingToPage(page, url)
     {
          console.log("Going to page");
          let info = this.ipMain + " :: " +page;
          this.data.newVisitor(info).subscribe((response) => {
               //Save the value of "visited" to the current date and time. 
               if(url != '')
                    window.open(url);
          });
     }
}
