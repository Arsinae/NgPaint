import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgpaintImageDirective} from './image/ngpaint-image.directive';
import {FilterService} from './image/filter.service';

@Component({
  selector: 'ngp-ngpaint',
  templateUrl: './ngpaint.component.html',
  styleUrls: ['./ngpaint.component.scss']
})
export class NgpaintComponent implements OnInit {

  @Input() image: NgpaintImageDirective = new NgpaintImageDirective();

  @ViewChild ('canvas') canvas;

  constructor(private filterCalculator: FilterService) { }

  ngOnInit() {
  }

  importImage(ev) {
    if (ev.target.files && ev.target.files[0]
      && ev.target.files[0].type.match('image\\/[a-zA-Z]+')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          this.image.size.x = img.width;
          this.image.size.y = img.height;
          this.image.dataUri = event.target['result'];
          this.image.dataUriBase = event.target['result'];
          this.loadInCanvas();
        };
        img.src = event.target['result'];
      };
      reader.readAsDataURL(ev.target.files[0]);
    }
  }

  loadInCanvas() {
    this.canvas.nativeElement.width = this.image.size.x;
    this.canvas.nativeElement.height = this.image.size.y;
    const ctx = this.canvas.nativeElement.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = this.image.dataUri;
  }

  applyFilter(filter) {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
    if (filter.filter === 'invert') {
      this.filterCalculator.invertColor(imgData);
    } else if (filter.filter === 'brightness') {
      this.filterCalculator.changeBrightness(imgData, filter.value / 100);
    } else if (filter.filter === 'grayscale') {
      this.filterCalculator.grayscale(imgData);
    } else if (filter.filter === 'sepia') {
      this.filterCalculator.sepia(imgData);
    }
    ctx.putImageData(imgData, 0, 0);
  }

}