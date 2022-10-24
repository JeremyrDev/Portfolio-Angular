import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
     selector: 'app-home',
     templateUrl: './home.component.html',
     styleUrls: ['./home.component.scss'],
     encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

     headerContentFade : boolean = false;

     constructor(private data: DataService, private router: Router) { }

     ngOnInit() 
     {
          console.log("Referrer: "+document.referrer);
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
}
