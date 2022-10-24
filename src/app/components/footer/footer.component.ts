import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit 
{
  @Input() showCTA: Boolean = true;
  
  constructor() { }

  public CurrentYear : string;

  ngOnInit() 
  {
    this.CurrentYear = new Date().getFullYear().toString();
  }
}
