import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgpaintImageDirective} from './image/ngpaint-image.directive';
import {FilterService} from './image/filter.service';
import {PixelDrawingService} from './image/pixel-drawing.service';

@Component({
  selector: 'ngp-ngpaint',
  templateUrl: './ngpaint.component.html',
  styleUrls: ['./ngpaint.component.scss']
})
export class NgpaintComponent implements OnInit {

  @Input() image: NgpaintImageDirective = new NgpaintImageDirective();

  @ViewChild ('canvas') canvas;

  draw: string = null;
  drawColor = '#ff0000';

  public historic: Array<{effect: string, data: ImageData}> = [];

  constructor(private filterCalculator: FilterService, private pixelDrawing: PixelDrawingService) { }

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
      this.addToHistoric('original', ctx.getImageData(0, 0, this.image.size.x, this.image.size.y));
    };
    img.src = this.image.dataUri;
  }

  addToHistoric(effect, data) {
    this.historic.push({
      effect: effect,
      data: data
    });
  }

  applyFilter(filter) {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
    if (filter.filter === 'invert') {
      this.filterCalculator.invertColor(imgData);
    } else if (filter.filter === 'brightness') {
      this.filterCalculator.changeBrightness(imgData, filter.value / 100);
    } else if (filter.filter === 'contrast') {
      this.filterCalculator.changeContrast(imgData, filter.value / 100);
    } else if (filter.filter === 'saturation') {
      this.filterCalculator.changeSaturation(imgData, filter.value / 100);
    } else if (filter.filter === 'grayscale') {
      this.filterCalculator.grayscale(imgData);
    } else if (filter.filter === 'sepia') {
      this.filterCalculator.sepia(imgData);
    } else if (filter.filter === 'candy') {
      this.filterCalculator.candy(imgData);
    } else if (filter.filter === 'emphasing') {
      this.filterCalculator.colorEmphasing(imgData, filter.value);
    } else if (filter.filter === 'gaussian') {
      this.filterCalculator.gaussian(imgData);
    } else if (filter.filter === 'sharpen') {
      this.filterCalculator.sharpen(imgData);
    }
    this.addToHistoric(filter.filter + ': ' + filter.value, imgData);
    ctx.putImageData(imgData, 0, 0);
  }

  resetPicture(ev) {
    if (!ev) {
      this.image.dataUri = this.image.dataUriBase;
      this.historic = [];
      this.loadInCanvas();
    } else {
      const ctx = this.canvas.nativeElement.getContext('2d');
      ctx.putImageData(ev.data, 0, 0);
      this.historic.splice(-1, 1);
    }
  }

  getDrawing(ev) {
    this.draw = ev;
    if (this.draw === 'draw') {
      this.canvas.nativeElement.onmousedown = (event) => {
        this.pixelDrawing.drawPixel(event, this.canvas.nativeElement, this.drawColor);
        const ctx = this.canvas.nativeElement.getContext('2d');
        const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
        this.addToHistoric('draw pixel', imgData);
        document.onmousemove = (click) => {
          this.pixelDrawing.drawLine(click, this.canvas.nativeElement);
          const imgDataMove = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
          this.addToHistoric('draw line', imgDataMove);
        };
        document.onmouseup = () => {
          this.pixelDrawing.stopDrawing();
        };
      };
    }
  }

}
