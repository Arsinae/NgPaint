import { Injectable } from '@angular/core';
import { StylingIndex } from '@angular/core/src/render3/styling';
import { ColorManipulationService } from '../color-manipulation.service';

@Injectable({
  providedIn: 'root'
})
export class PixelDrawingService {

  pixelDraw: Array<{x: number, y: number}> = [];
  img;

  constructor() { }

  drawPixel(click, canvas, param) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.fillStyle = param.color;
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillRect(posX, posY, param.size, param.size);
    this.pixelDraw.push({x: posX, y: posY});
  }

  drawLine(click, canvas) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.pixelDraw.push({x: posX, y: posY});
    this.drawPathLine(ctx);
  }

  printDrawing(canvas, drawingInstance, param) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    this.drawPathLine(ctx);
    this.pixelDraw = [];
    document.onmousemove = null;
    document.onmouseup = null;
  }

  drawPathLine(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.pixelDraw[0].x, this.pixelDraw[0].y);
    for (let i = 1; i < this.pixelDraw.length; i++) {
      ctx.lineTo(this.pixelDraw[i].x, this.pixelDraw[i].y);
    }
    ctx.stroke();
  }

  drawSquareBase(click, canvas, param) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.fillStyle = param.color;
    ctx.fillRect(posX, posY, 1, 1);
    this.pixelDraw.push({x: posX, y: posY});
  }

  drawSquare(click, canvas) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(this.pixelDraw[0].x, this.pixelDraw[0].y,
      posX - this.pixelDraw[0].x, posY - this.pixelDraw[0].y);
  }

  printSquare(click, canvas, drawingInstance, param) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.fillStyle = param.color;
    ctx.fillRect(this.pixelDraw[0].x, this.pixelDraw[0].y,
      posX - this.pixelDraw[0].x, posY - this.pixelDraw[0].y);
    this.pixelDraw = [];
    document.onmousemove = null;
    document.onmouseup = null;
  }

  drawEmptySquareBase(click, canvas, param) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.size;
    ctx.beginPath();
    ctx.rect(posX, posY, 1, 1);
    ctx.stroke();
    this.pixelDraw.push({x: posX, y: posY});
  }

  drawEmptySquare(click, canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.beginPath();
    ctx.rect(this.pixelDraw[0].x, this.pixelDraw[0].y,
      posX - this.pixelDraw[0].x, posY - this.pixelDraw[0].y);
    ctx.stroke();
  }

  printEmptySquare(click, canvas, drawingInstance, param) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.strokeStyle = param.color;
    ctx.beginPath();
    ctx.rect(this.pixelDraw[0].x, this.pixelDraw[0].y,
      posX - this.pixelDraw[0].x, posY - this.pixelDraw[0].y);
    ctx.stroke();
    this.pixelDraw = [];
    document.onmousemove = null;
    document.onmouseup = null;
  }

  drawRoundBase(click, canvas, param) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.fillStyle = param.color;
    ctx.beginPath();
    ctx.arc(posX, posY, 1, 0, 2 * Math.PI, false);
    ctx.fill();
    this.pixelDraw.push({x: posX, y: posY});
  }

  drawRound(click, canvas) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    const dist = Math.sqrt(Math.pow(posX - this.pixelDraw[0].x, 2) + Math.pow(posY - this.pixelDraw[0].y, 2));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(this.pixelDraw[0].x, this.pixelDraw[0].y, dist, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  printRound(click, canvas, drawingInstance, param) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    const dist = Math.sqrt(Math.pow(posX - this.pixelDraw[0].x, 2) + Math.pow(posY - this.pixelDraw[0].y, 2));
    ctx.fillStyle = param.color;
    ctx.beginPath();
    ctx.arc(this.pixelDraw[0].x, this.pixelDraw[0].y, dist, 0, 2 * Math.PI, false);
    ctx.fill();
    this.pixelDraw = [];
    document.onmousemove = null;
    document.onmouseup = null;
  }

  drawCircleBase(click, canvas, param) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.size;
    ctx.beginPath();
    ctx.arc(posX, posY, 1, 0, 2 * Math.PI, false);
    ctx.stroke();
    this.pixelDraw.push({x: posX, y: posY});
  }

  drawCircle(click, canvas) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    const dist = Math.sqrt(Math.pow(posX - this.pixelDraw[0].x, 2) + Math.pow(posY - this.pixelDraw[0].y, 2));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(this.pixelDraw[0].x, this.pixelDraw[0].y, dist, 0, 2 * Math.PI, false);
    ctx.stroke();
  }

  printCircle(click, canvas, drawingInstance, param) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    const dist = Math.sqrt(Math.pow(posX - this.pixelDraw[0].x, 2) + Math.pow(posY - this.pixelDraw[0].y, 2));
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.size;
    ctx.beginPath();
    ctx.arc(this.pixelDraw[0].x, this.pixelDraw[0].y, dist, 0, 2 * Math.PI, false);
    ctx.stroke();
    this.pixelDraw = [];
    document.onmousemove = null;
    document.onmouseup = null;
  }

  drawFigureBase(click, canvas, param) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.size;
    ctx.beginPath();
    ctx.rect(posX, posY, 1, 1);
    ctx.stroke();
    this.pixelDraw.push({x: posX, y: posY});
  }

  drawArrow(click, canvas) {
    const ctx = canvas.getContext('2d');
    const pos = {x: click.clientX - canvas.parentNode.parentNode.offsetLeft,
      y: click.clientY - canvas.parentNode.parentNode.offsetTop};
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.calcDrawArrow(this.pixelDraw[0], pos, ctx);
  }

  printArrow(click, canvas, drawingInstance, param) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    const pos = {x: click.clientX - canvas.parentNode.parentNode.offsetLeft,
      y: click.clientY - canvas.parentNode.parentNode.offsetTop};
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.size;
    this.calcDrawArrow(this.pixelDraw[0], pos, ctx);
    this.pixelDraw = [];
    document.onmousemove = null;
    document.onmouseup = null;
  }

  calcDrawArrow(origin, pos, ctx) {
    const arrowLen = Math.max(Math.sqrt(Math.pow(pos.x - origin.x, 2) + Math.pow(pos.y - origin.y, 2)) * 0.15, 15);
    const angle = Math.atan2(pos.y - origin.y, pos.x - origin.x);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x - arrowLen * Math.cos(angle + Math.PI / 6), pos.y - arrowLen * Math.sin(angle + Math.PI / 6));
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x - arrowLen * Math.cos(angle - Math.PI / 6), pos.y - arrowLen * Math.sin(angle - Math.PI / 6));
    ctx.stroke();
  }

  drawStar(click, canvas, spikes) {
    const ctx = canvas.getContext('2d');
    const pos = {x: click.clientX - canvas.parentNode.parentNode.offsetLeft,
      y: click.clientY - canvas.parentNode.parentNode.offsetTop};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.calcDrawStar(this.pixelDraw[0], pos, ctx, spikes);
  }

  printStar(click, canvas, drawingInstance, param, spikes) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    const pos = {x: click.clientX - canvas.parentNode.parentNode.offsetLeft,
      y: click.clientY - canvas.parentNode.parentNode.offsetTop};
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.size;
    this.calcDrawStar(this.pixelDraw[0], pos, ctx, spikes);
    this.pixelDraw = [];
    document.onmousemove = null;
    document.onmouseup = null;
  }

  calcDrawStar(origin, pos, ctx, spikes) {
    const length = Math.sqrt(Math.pow(pos.x - origin.x, 2) + Math.pow(pos.y - origin.y, 2));
    let x = 0, y = 0;
    let rotate = Math.PI / 2 * 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y - length);
    for (let i = 0; i < spikes; i++) {
      x = origin.x + Math.cos(rotate) * length;
      y = origin.y + Math.sin(rotate) * length;
      ctx.lineTo(x, y);
      rotate += (Math.PI / spikes);

      x = origin.x + Math.cos(rotate) * (length / 2);
      y = origin.y + Math.sin(rotate) * (length / 2);
      ctx.lineTo(x, y);
      rotate += (Math.PI / spikes);
    }
    ctx.lineTo(origin.x, origin.y - length);
    ctx.closePath();
    ctx.stroke();
  }

  drawText(click, canvas, param, text) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.font = (20 + param.size) + 'px Comic Sans MS';
    if (!text.effect) {
      this.printBasicText(ctx, param, text.value, posX, posY);
    } else if (text.effect === '3d') {
      this.print3DText(ctx, param, text.value, posX, posY);
    } else {
      this.printNeonText(ctx, param, text.value, posX, posY);
    }
    ctx.restore();
  }

  printText(click, canvas, drawingInstance, param, text) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.save();
    ctx.font = (20 + param.size) + 'px Comic Sans MS';
    ctx.textBaseline = 'middle';
   if (!text.effect) {
     this.printBasicText(ctx, param, text.value, posX, posY);
   } else if (text.effect === '3d') {
     this.print3DText(ctx, param, text.value, posX, posY);
   } else {
     this.printNeonText(ctx, param, text.value, posX, posY);
   }
    ctx.restore();
    document.onmousemove = null;
    document.onmouseup = null;
  }

  printBasicText(ctx, param, text, posX, posY) {
    ctx.fillStyle = param.color;
    ctx.fillText(text, posX, posY);
  }

  print3DText(ctx, param, text, posX, posY) {
    ctx.shadowBlur = 2;
    ctx.fillStyle = 'cyan';
    ctx.shadowColor = 'cyan';
    ctx.fillText(text, posX - 3, posY - 1);
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'white';
    ctx.fillText(text, posX, posY);
    ctx.fillStyle = 'red';
    ctx.shadowColor = 'red';
    ctx.fillText(text, posX + 3, posY + 1);
  }

  printNeonText(ctx, param, text, posX, posY) {
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = param.color;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 20;
    ctx.fillText(text, posX, posY);
  }

  getColor(click, canvas) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    const data = ctx.getImageData(posX, posY, 1, 1).data;
    return ColorManipulationService.rgbToHex(data[0], data[1], data[2]);
  }

  compareColor (color1, color2) {
    return (color1.r === color2.r && color1.g === color2.g && color1.b === color2.b);
  }

  checkFill(posX, posY, baseColor, ctx, newColor) {
    if (posX > 0) {
      const leftIndex = ((posX - 1) + (posY * ctx.canvas.width)) * 4;
      const leftColorRgb = {r: this.img.data[leftIndex], g: this.img.data[leftIndex + 1], b: this.img.data[leftIndex + 2]};
      const leftColorValue = this.img.data[leftIndex] + this.img.data[leftIndex + 1] + this.img.data[leftIndex + 2];
      if (Math.abs(baseColor - leftColorValue) < 20 && !this.compareColor(leftColorRgb, newColor)) {
        this.img.data[leftIndex] = newColor.r;
        this.img.data[leftIndex + 1] = newColor.g;
        this.img.data[leftIndex + 2] = newColor.b;
        this.checkFill(posX - 1, posY, baseColor, ctx, newColor);
      }
    }
    if (posX + 1 < ctx.canvas.width) {
      const rightIndex = ((posX + 1) + (posY * ctx.canvas.width)) * 4;
      const rightColorRgb = {r: this.img.data[rightIndex], g: this.img.data[rightIndex + 1], b: this.img.data[rightIndex + 2]};
      const rightColorValue = this.img.data[rightIndex] + this.img.data[rightIndex + 1] + this.img.data[rightIndex + 2];
      if (Math.abs(baseColor - rightColorValue) < 20 && !this.compareColor(rightColorRgb, newColor)) {
        this.img.data[rightIndex] = newColor.r;
        this.img.data[rightIndex + 1] = newColor.g;
        this.img.data[rightIndex + 2] = newColor.b;
        this.checkFill(posX + 1, posY, baseColor, ctx, newColor);
      }
    }
    if (posY > 0) {
      const upIndex = (posX + ((posY - 1) * ctx.canvas.width)) * 4;
      const upColorRgb = {r: this.img.data[upIndex], g: this.img.data[upIndex + 1], b: this.img.data[upIndex + 2]};
      const upColorValue = this.img.data[upIndex] + this.img.data[upIndex + 1] + this.img.data[upIndex + 2];
      if (Math.abs(baseColor - upColorValue) < 20 && !this.compareColor(upColorRgb, newColor)) {
        this.img.data[upIndex] = newColor.r;
        this.img.data[upIndex + 1] = newColor.g;
        this.img.data[upIndex + 2] = newColor.b;
        this.checkFill(posX, posY - 1, baseColor, ctx, newColor);
      }
    }
    if (posY + 1 < ctx.canvas.height) {
      const bottomIndex = (posX + ((posY + 1) * ctx.canvas.width)) * 4;
      const bottomColorRgb = {r: this.img.data[bottomIndex], g: this.img.data[bottomIndex + 1], b: this.img.data[bottomIndex + 2]};
      const bottomColorValue = this.img.data[bottomIndex] + this.img.data[bottomIndex + 1] + this.img.data[bottomIndex + 2];
      if (Math.abs(baseColor - bottomColorValue) < 20 && !this.compareColor(bottomColorRgb, newColor)) {
        this.img.data[bottomIndex] = newColor.r;
        this.img.data[bottomIndex + 1] = newColor.g;
        this.img.data[bottomIndex + 2] = newColor.b;
        this.checkFill(posX, posY + 1, baseColor, ctx, newColor);
      }
    }
  }

  fillColor(click, canvas, param) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    const baseColor = ctx.getImageData(posX, posY, 1, 1).data;
    const baseColorValue = baseColor[0] + baseColor[1] + baseColor[2];
    const newColor = ColorManipulationService.hexToRGB(param.color);
    ctx.fillStyle = param.color;
    ctx.fillRect(posX, posY, 1, 1);
    this.img = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.checkFill(posX, posY, baseColorValue, ctx, newColor);
    ctx.putImageData(this.img, 0, 0);
  }
}
