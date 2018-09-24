import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgpaintImageDirective} from '../image/ngpaint-image.directive';

@Component({
  selector: 'ngp-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() image: NgpaintImageDirective;

  @Output() filter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filter) {
    this.filter.emit({filter: filter, value: 200});
  }

}
