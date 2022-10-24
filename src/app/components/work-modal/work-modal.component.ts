import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-work-modal',
  templateUrl: './work-modal.component.html',
  styleUrls: ['./work-modal.component.scss']
})

export class WorkModalComponent {
  public description: string;
  constructor(public data: DataService, private sanitizer: DomSanitizer) { }

  getHTMLDescription()
  {
    return this.sanitizer.bypassSecurityTrustHtml(this.data.workItems[this.data.selectedWorkItem].description.content);
  }
}
