import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { WorkItem } from 'src/app/models/work-item';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss']
})
export class WorkItemComponent implements OnInit {

  @Input() itemIndex: number;
  public item: WorkItem;

  constructor(public data: DataService) { }

  ngOnInit() {
    this.item = this.data.workItems[this.itemIndex];
  }
}
