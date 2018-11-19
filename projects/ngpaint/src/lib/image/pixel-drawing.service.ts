import { Injectable } from '@angular/core';
import { StylingIndex } from '@angular/core/src/render3/styling';
import { ColorManipulationService } from '../color-manipulation.service';

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

  drawText(click, canvas, param) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = param.color;
    ctx.font = (30 + param.size) + 'px Comic Sans MS';
    ctx.fillText('Hello World!', posX, posY);
  }

  printText(click, canvas, drawingInstance, param) {
    drawingInstance.getContext('2d').clearRect(0, 0, drawingInstance.width, drawingInstance.height);
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    ctx.fillStyle = param.color;
    ctx.font = (30 + param.size) + 'px Comic Sans MS';
    ctx.fillText('Hello World!', posX, posY);
    this.pixelDraw = [];
    document.onmousemove = null;
    document.onmouseup = null;
  }

  getColor(click, canvas) {
    const ctx = canvas.getContext('2d');
    const posX = click.clientX - canvas.parentNode.parentNode.offsetLeft;
    const posY = click.clientY - canvas.parentNode.parentNode.offsetTop;
    const data = ctx.getImageData(posX, posY, 1, 1).data;
    return ColorManipulationService.rgbToHex(data[0], data[1], data[2]);
  }
}
