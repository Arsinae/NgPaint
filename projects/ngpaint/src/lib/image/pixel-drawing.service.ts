import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PixelDrawingService {

  pixelDraw: Array<{x: number, y: number}> = [];

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
    this.drawPath(ctx);
  }

  stopDrawing(canvas, drawingInstance, param) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = param.color;
    ctx.lineWidth = param.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
   this.drawPath(ctx);
    this.pixelDraw = [];
    document.onmousemove = null;
    document.onmouseup = null;
  }

  drawPath(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.pixelDraw[0].x, this.pixelDraw[0].y);
    for (let i = 1; i < this.pixelDraw.length; i++) {
      ctx.lineTo(this.pixelDraw[i].x, this.pixelDraw[i].y);
    }
    ctx.stroke();
  }
}
