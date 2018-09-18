import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgpaintImageDirective} from '../ngpaint-image.directive';

@Component({
  selector: 'ngp-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent implements OnInit {

  @Input() image: NgpaintImageDirective;

  @ViewChild ('canvas') canvas;

  constructor() { }

  ngOnInit() {
    this.canvas.nativeElement.width = this.image.size.x;
    this.canvas.nativeElement.height = this.image.size.y;
    const ctx = this.canvas.nativeElement.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = this.image.dataUri;
  }

}
