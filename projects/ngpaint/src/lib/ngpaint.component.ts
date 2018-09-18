import {Component, Input, OnInit} from '@angular/core';
import {NgpaintImageDirective} from './image/ngpaint-image.directive';

@Component({
  selector: 'ngp-ngpaint',
  templateUrl: './ngpaint.component.html',
  styleUrls: ['./ngpaint.component.scss']
})
export class NgpaintComponent implements OnInit {

  @Input() image: NgpaintImageDirective = new NgpaintImageDirective();

  constructor() { }

  ngOnInit() {
  }

  importImage(ev) {
    if (ev.target.files && ev.target.files[0]
      && ev.target.files[0].type.match('image\\/[a-zA-Z]+')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          console.log(img);
          this.image.size.x = img.width;
          this.image.size.y = img.height;
          this.image.dataUri = event.target['result'];
        };
        img.src = event.target['result'];
      };
      reader.readAsDataURL(ev.target.files[0]);
    }
  }

}
