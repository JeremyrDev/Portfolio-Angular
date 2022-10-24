import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ipMain: string = "";
  avatar: string = "profile";
  delay: number = 0;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {

    this.delay = 400;
    this.show(document.getElementById("header-1"), 100);
    this.show(document.getElementById("header-2"), 100);
    this.show(document.getElementById("header-3"), 100);
    this.show(document.getElementById("header-4"), 100);
    this.show(document.getElementById("header-5"), 100);
    this.show(document.getElementById("header-6"), 100);
    this.show(document.getElementById("header-7"), 100);
    this.show(document.getElementById("header-8"), 100);

    setTimeout(() => {
      this.SwapImage(true);
      setTimeout(() => {
        this.SwapImage(false);
      }, 1000);
    }, 5000);
  }

  show(element, increment)
  {
    this.delay += increment;
    setTimeout(() => { element.style.opacity = "1"; }, this.delay);
  }

  SwapImage(hovering)
  {
    document.getElementById('avatar').style.opacity = '0';

    setTimeout(() => {
      this.avatar = hovering ? 'alt' : 'profile';
      document.getElementById('avatar').style.opacity = '1';
    }, 150);
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
      if(url != '')
                window.open(url);
      this.data.newVisitor(info).subscribe((response) => {
            //Save the value of "visited" to the current date and time. 
      });
  }

}
