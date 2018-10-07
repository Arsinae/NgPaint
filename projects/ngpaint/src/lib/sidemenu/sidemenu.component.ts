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
  @Output() reset: EventEmitter<any> = new EventEmitter();

  brightness = 0;
  contrast = 0;
  saturation = 0;

  constructor() { }

  ngOnInit() {
  }

  applyLuminance(filter, value) {
    this.filter.emit({filter: filter, value: value});
  }

  applyFilter(filter) {
    this.filter.emit({filter: filter, value: null});
  }

}
