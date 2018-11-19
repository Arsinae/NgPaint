import {Component, EventEmitter, Input, OnInit, Output, ViewChild, HostListener} from '@angular/core';
import {NgpaintImageDirective} from './image/ngpaint-image.directive';
import {FilterService} from './image/filter.service';
import {PixelDrawingService} from './image/pixel-drawing.service';
import {MenuDirective} from './sidemenu/menu.directive';

@Component({
  selector: 'ngp-ngpaint',
  templateUrl: './ngpaint.component.html',
  styleUrls: ['./ngpaint.component.scss']
})
export class NgpaintComponent implements OnInit {

  @Input() image: NgpaintImageDirective = new NgpaintImageDirective();
  @Input() menu: MenuDirective = new MenuDirective();

  @Output() dataUrl: EventEmitter<any> = new EventEmitter();

  @ViewChild ('canvas') canvas;
  @ViewChild ('drawingInstance') drawingInstance;

  draw: string = null;
  drawParam = {color: '#ff0000', size: 1};

  public historic: Array<{effect: string, data: ImageData}> = [];

  constructor(private filterCalculator: FilterService, private pixelDrawing: PixelDrawingService) { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event']) onKeyPress(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 90) {
      if (this.historic.length >= 2) {
        this.resetPicture(this.historic[this.historic.length - 2]);
      }
    }
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
    this.drawingInstance.nativeElement.width = this.image.size.x;
    this.drawingInstance.nativeElement.height = this.image.size.y;
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
    } else if (filter.filter === 'rainbow') {
      this.filterCalculator.rainbow(imgData);
    } else if (filter.filter === 'emphasing') {
      this.filterCalculator.colorEmphasing(imgData, filter.value);
    } else if (filter.filter === 'gaussian') {
      this.filterCalculator.gaussian(imgData);
    } else if (filter.filter === 'sharpen') {
      this.filterCalculator.sharpen(imgData);
    } else if (filter.filter === 'vignetting') {
      this.filterCalculator.vignetting(imgData, filter.value);
    } else if (filter.filter === 'splash') {
      this.filterCalculator.splash(imgData, filter.value.color, filter.value.dist);
    } else if (filter.filter === 'warmer') {
      this.filterCalculator.warmer(imgData, filter.value);
    } else if (filter.filter === 'colder') {
      this.filterCalculator.colder(imgData, filter.value);
    }
    this.addToHistoric(filter.filter + ': ' + filter.value, imgData);
    ctx.putImageData(imgData, 0, 0);
  }

  resetPicture(ev) {
    if (!ev) {
      this.image.dataUri = this.image.dataUriBase;
      for (let i = this.historic.length - 1; i > 0 && this.historic[i].effect !== 'effect'; i--) {
        this.historic.splice(-1, 1);
      }
      this.loadInCanvas();
    } else {
      if (ev.data.width !== this.image.size.x || ev.data.height !== this.image.size.y) {
        this.resetOldPicture(ev);
      }
      const ctx = this.canvas.nativeElement.getContext('2d');
      ctx.putImageData(ev.data, 0, 0);
      this.historic.splice(-1, 1);
    }
  }

  resetOldPicture(ev) {
    this.image.size.x = ev.data.width;
    this.image.size.y = ev.data.height;
    this.canvas.nativeElement.width = this.image.size.x;
    this.canvas.nativeElement.height = this.image.size.y;
    let i = this.historic.length - 2;
    while (this.historic[i].effect !== 'original' && i > 0) {
      i--;
    }
    const canvas = document.createElement('canvas');
    canvas.width = this.image.size.x;
    canvas.height = this.image.size.y;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(this.historic[i].data, 0, 0);
    this.image.dataUriBase = canvas.toDataURL();
    console.log(this.historic[i], this.image.dataUriBase);
  }

  downloadPicture() {
    this.dataUrl.emit(this.canvas.nativeElement.toDataURL());
  }

  getDrawing(ev) {
    this.draw = ev;
    if (this.draw === 'draw') {
      this.drawingPixel();
    } else if (this.draw === 'square') {
      this.drawingSquare();
    } else if (this.draw === 'emptySquare') {
      this.drawingEmptySquare();
    } else if (this.draw === 'round') {
      this.drawingRound();
    } else if (this.draw === 'circle') {
      this.drawingCircle();
    } else if (this.draw === 'arrow') {
      this.drawingArrow();
    } else if (this.draw.match('star [0-9]+')) {
      const spikes = parseInt(this.draw.split(' ')[1], 10);
      this.drawingStar(spikes);
    } else if (this.draw === 'text') {
      this.drawingText();
    }
  }

  drawingPixel() {
    this.canvas.nativeElement.parentNode.parentNode.onmousedown = (event) => {
      this.pixelDrawing.drawPixel(event, this.drawingInstance.nativeElement, this.drawParam);
      document.onmousemove = (click) => {
        this.pixelDrawing.drawLine(click, this.drawingInstance.nativeElement);
      };
      document.onmouseup = () => {
        this.pixelDrawing.printDrawing(this.canvas.nativeElement, this.drawingInstance.nativeElement, this.drawParam);
        const ctx = this.canvas.nativeElement.getContext('2d');
        const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
        this.addToHistoric('draw pixel', imgData);
      };
    };
  }

  drawingSquare() {
    this.canvas.nativeElement.parentNode.parentNode.onmousedown = (event) => {
      this.pixelDrawing.drawSquareBase(event, this.drawingInstance.nativeElement, this.drawParam);
      document.onmousemove = (click) => {
        this.pixelDrawing.drawSquare(click, this.drawingInstance.nativeElement);
      };
      document.onmouseup = (click) => {
        this.pixelDrawing.printSquare(click, this.canvas.nativeElement, this.drawingInstance.nativeElement, this.drawParam);
        const ctx = this.canvas.nativeElement.getContext('2d');
        const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
        this.addToHistoric('draw square', imgData);
      };
    };
  }

  drawingEmptySquare() {
    this.canvas.nativeElement.parentNode.parentNode.onmousedown = (event) => {
      this.pixelDrawing.drawEmptySquareBase(event, this.drawingInstance.nativeElement, this.drawParam);
      document.onmousemove = (click) => {
        this.pixelDrawing.drawEmptySquare(click, this.drawingInstance.nativeElement);
      };
      document.onmouseup = (click) => {
        this.pixelDrawing.printEmptySquare(click, this.canvas.nativeElement, this.drawingInstance.nativeElement, this.drawParam);
        const ctx = this.canvas.nativeElement.getContext('2d');
        const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
        this.addToHistoric('draw empty square', imgData);
      };
    };
  }

  drawingRound() {
    this.canvas.nativeElement.parentNode.parentNode.onmousedown = (event) => {
      this.pixelDrawing.drawRoundBase(event, this.drawingInstance.nativeElement, this.drawParam);
      document.onmousemove = (click) => {
        this.pixelDrawing.drawRound(click, this.drawingInstance.nativeElement);
      };
      document.onmouseup = (click) => {
        this.pixelDrawing.printRound(click, this.canvas.nativeElement, this.drawingInstance.nativeElement, this.drawParam);
        const ctx = this.canvas.nativeElement.getContext('2d');
        const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
        this.addToHistoric('draw round', imgData);
      };
    };
  }

  drawingCircle() {
    this.canvas.nativeElement.parentNode.parentNode.onmousedown = (event) => {
      this.pixelDrawing.drawCircleBase(event, this.drawingInstance.nativeElement, this.drawParam);
      document.onmousemove = (click) => {
        this.pixelDrawing.drawCircle(click, this.drawingInstance.nativeElement);
      };
      document.onmouseup = (click) => {
        this.pixelDrawing.printCircle(click, this.canvas.nativeElement, this.drawingInstance.nativeElement, this.drawParam);
        const ctx = this.canvas.nativeElement.getContext('2d');
        const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
        this.addToHistoric('draw circle', imgData);
      };
    };
  }

  drawingArrow() {
    this.canvas.nativeElement.parentNode.parentNode.onmousedown = (event) => {
      this.pixelDrawing.drawFigureBase(event, this.drawingInstance.nativeElement, this.drawParam);
      document.onmousemove = (click) => {
        this.pixelDrawing.drawArrow(click, this.drawingInstance.nativeElement);
      };
      document.onmouseup = (click) => {
        this.pixelDrawing.printArrow(click, this.canvas.nativeElement, this.drawingInstance.nativeElement, this.drawParam);
        const ctx = this.canvas.nativeElement.getContext('2d');
        const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
        this.addToHistoric('draw arrow', imgData);
      };
    };
  }

  drawingStar(spikes) {
    this.canvas.nativeElement.parentNode.parentNode.onmousedown = (event) => {
      this.pixelDrawing.drawFigureBase(event, this.drawingInstance.nativeElement, this.drawParam);
      document.onmousemove = (click) => {
        this.pixelDrawing.drawStar(click, this.drawingInstance.nativeElement, spikes);
      };
      document.onmouseup = (click) => {
        this.pixelDrawing.printStar(click, this.canvas.nativeElement, this.drawingInstance.nativeElement, this.drawParam, spikes);
        const ctx = this.canvas.nativeElement.getContext('2d');
        const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
        this.addToHistoric('draw star', imgData);
      };
    };
  }

  drawingText() {
    this.canvas.nativeElement.parentNode.parentNode.onmousedown = (event) => {
      this.pixelDrawing.drawText(event, this.drawingInstance.nativeElement, this.drawParam);
      document.onmousemove = (click) => {
        this.pixelDrawing.drawText(click, this.drawingInstance.nativeElement, this.drawParam);
      };
      document.onmouseup = (click) => {
        this.pixelDrawing.printText(click, this.canvas.nativeElement, this.drawingInstance.nativeElement, this.drawParam);
        const ctx = this.canvas.nativeElement.getContext('2d');
        const imgData = ctx.getImageData(0, 0, this.image.size.x, this.image.size.y);
        this.addToHistoric('draw text', imgData);
      };
    };
  }
}
