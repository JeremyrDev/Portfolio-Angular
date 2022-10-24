import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit 
{
  delay: number = 0;
  ipMain: string = "";

  constructor(private data : DataService) { }

  ngOnInit() 
  {
    this.GetNewVisitor();

    this.delay = 400;
    this.Show(document.getElementById("navitem-1"), 100);
    this.Show(document.getElementById("navitem-2"), 100);
    this.Show(document.getElementById("navitem-3"), 100);
    this.Show(document.getElementById("navitem-4"), 100);
    this.Show(document.getElementById("navitem-5"), 100);
  }

  GetNewVisitor()
  {
    this.data.getIP().subscribe((response) => 
    {
      console.log("IP: " + JSON.stringify(response['ip']));
      let ip = JSON.stringify(response['ip']).replace(/\"/g, '');
      this.ipMain = ip;
      this.data.newVisitor(ip).subscribe((response) => {
           //Save the value of "visited" to the current date and time. 
      });
    });
  }

  Show(element, increment)
  {
    this.delay += increment;
    setTimeout(() => { element.style.opacity = "1"; }, this.delay);
  }
}
