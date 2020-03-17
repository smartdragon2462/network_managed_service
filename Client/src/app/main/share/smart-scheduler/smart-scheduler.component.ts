import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'smart-scheduler',
  templateUrl: './smart-scheduler.component.html',
  styleUrls: ['./smart-scheduler.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class SmartSchedulerComponent implements OnInit {

  filteredData = [];
  constructor() { }

  ngOnInit() {
  }

}
