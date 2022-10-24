import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      document.getElementById("skills-top").style.top = "0px";
      document.getElementById("skills-top").style.opacity = "1";
      document.getElementById("skills-bottom").style.top = "260px";
      document.getElementById("skills-bottom").style.opacity = "1";
    }, 2200);
  }
}
