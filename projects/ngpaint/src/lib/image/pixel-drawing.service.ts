import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PixelDrawingService {

  pixelDraw: {x: number, y: number};

  constructor() { }

  drawPixel(click, canvas, color) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.offsetLeft;
    const posY = click.clientY - canvas.offsetTop;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fillRect(posX, posY, 1, 1);
    this.pixelDraw = {x: posX, y: posY};
  }

  drawLine(click, canvas) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.offsetLeft;
    const posY = click.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(this.pixelDraw.x, this.pixelDraw.y);
    ctx.lineTo(posX, posY);
    ctx.stroke();
    this.pixelDraw = {x: posX, y: posY};
  }

  stopDrawing() {
    this.pixelDraw = {x: 0, y: 0};
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
