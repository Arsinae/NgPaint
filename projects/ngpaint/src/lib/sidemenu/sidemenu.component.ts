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
  @Input() drawColor: string;

  @Output() filter: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();
  @Output() draw: EventEmitter<any> = new EventEmitter();
  @Output() drawColorChange: EventEmitter<any> = new EventEmitter();

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
    this.drawColor = event;
    this.drawColorChange.emit(this.drawColor);
  }

}
