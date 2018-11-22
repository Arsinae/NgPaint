import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgpaintImageDirective} from '../image/ngpaint-image.directive';
import {MenuDirective} from './menu.directive';

@Component({
  selector: 'ngp-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() image: NgpaintImageDirective;
  @Input() historic: Array<{effect: string, data}>;
  @Input() drawParam: {color: string, size: number};
  @Input() menu: MenuDirective = new MenuDirective();

  @Output() reset: EventEmitter<any> = new EventEmitter();
  @Output() changePicture: EventEmitter<any> = new EventEmitter();
  @Output() download: EventEmitter<any> = new EventEmitter();
  @Output() drawEvent: EventEmitter<any> = new EventEmitter();
  @Output() textEvent: EventEmitter<any> = new EventEmitter();
  @Output() drawParamChange: EventEmitter<any> = new EventEmitter();
  @Output() filter: EventEmitter<any> = new EventEmitter();

  submenu = '';

  brightness = 0;
  contrast = 0;
  saturation = 0;
  emphasing = {color: 'red', intensity: 122};
  splash = {color: '#ff0000', dist: 40};
  presetColor = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#000000', '#ffffff', '#cccccc'];
  text = {value: '', effect: null};

  constructor() { }

  ngOnInit() {
  }

  menuBack() {
    this.submenu = this.submenu.substr(0, this.submenu.lastIndexOf('/'));
  }

  applyFilter(filter, value) {
    this.filter.emit({filter: filter, value: value});
  }

  addColor(event) {
    if (this.presetColor.length > 14) {
      this.presetColor.splice(9, 1);
    }
    this.presetColor.push(event);
  }

  changeDrawColor(event) {
    this.drawParam.color = event;
    this.drawParamChange.emit(this.drawParam);
  }

  get spikesMenu() {
    const spikesMenu = [];
    for (let i = 3; i <= 15; i++) {
      spikesMenu.push(i);
    }
    return spikesMenu;
  }

}
