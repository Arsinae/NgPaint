import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgpaintImageDirective} from '../image/ngpaint-image.directive';

@Component({
  selector: 'ngp-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() image: NgpaintImageDirective;
  @Input() historic: Array<{effect: string, data}>;
  @Input() drawParam: {color: string, size: number};

  @Output() reset: EventEmitter<any> = new EventEmitter();
  @Output() download: EventEmitter<any> = new EventEmitter();
  @Output() draw: EventEmitter<any> = new EventEmitter();
  @Output() drawParamChange: EventEmitter<any> = new EventEmitter();
  @Output() filter: EventEmitter<any> = new EventEmitter();

  submenu = null;

  brightness = 0;
  contrast = 0;
  saturation = 0;
  emphasing = {color: 'red', intensity: 122};

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filter, value) {
    this.filter.emit({filter: filter, value: value});
  }

  changeDrawColor(event) {
    this.drawParam.color = event;
    this.drawParamChange.emit(this.drawParam);
  }

}
