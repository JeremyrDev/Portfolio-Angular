import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { WorkItem } from 'src/app/models/work-item';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  constructor(public data: DataService) { }

  ngOnInit() {
    
  }
}
