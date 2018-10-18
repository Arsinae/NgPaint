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
}
