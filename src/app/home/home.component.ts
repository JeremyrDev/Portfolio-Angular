import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';

@Component({
     selector: 'app-home',
     templateUrl: './home.component.html',
     styleUrls: ['./home.component.scss'],
     encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

     headerContentFade : boolean = false;

     constructor(private data: DataService) { }

     star : Number[] = [0, 0, 0, 0, 0];
     ratedValue : Number[] = [0, 0, 0, 0, 0];

     plainRating: Number = 0;

     rated : boolean = false;

     rateResponseText: string = "";

     ngOnInit() 
     {
          if(window.localStorage.getItem("rating"))
          {
               console.log("Saved Rating: "+window.localStorage.getItem("rating"));
               this.plainRating = Number(window.localStorage.getItem("rating"));
               this.rate(Number(window.localStorage.getItem("rating")) - 1, true);
          }

          window.addEventListener('scroll', this.scroll, true);

          $(function () {
               $('[data-toggle="popover"]').popover({
                    html: true
               })
          })
     }

     ngOnDestroy() {
          window.removeEventListener('scroll', this.scroll, true);
     }

     ngAfterViewInit() {
          (document.querySelector('.stars-container') as HTMLElement).style.marginTop = '10px';
     }

     scroll = (event: any): void => {

          const number = event.srcElement.scrollingElement.scrollTop;

          if(number >= 550)
          {
               this.headerContentFade = true;
          }
          else 
               this.headerContentFade = false;
     };

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
          this.data.submitRating(index + 1, "").subscribe((response) => {
               console.log("Rating Submitted: "+JSON.stringify(response));

               this.rateResponseText += "<br> <span class='rating-average'> The average rating is " + response['average_rating'].toFixed(1) + "</span>";
          });
     }

     leavePopover()
     {
          $('#discord').popover('hide');
     }
}
