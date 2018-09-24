import { Injectable } from '@angular/core';
import {ColorManipulationService} from '../color-manipulation.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private colorManipulator: ColorManipulationService) { }

  invertColor(imgData) {
    const px = imgData.data;
    this.colorManipulator.rgbToHsl(52, 189, 32);
    for (let i = 0; i < px.length; i += 4) {
      px[i] = this.colorManipulator.invertColor(px[i]);
      px[i + 1] = this.colorManipulator.invertColor(px[i + 1]);
      px[i + 2] = this.colorManipulator.invertColor(px[i + 2]);
    }
  }

  changeBrightness(imgData, brightness) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      const hsl = this.colorManipulator.rgbToHsl(px[i], px[i + 1], px[i + 2]);
      hsl.l = Math.min(1, hsl.l * brightness);
      const newColor = this.colorManipulator.hslToRgb(hsl.h, hsl.s, hsl.l);
      px[i] = newColor.r;
      px[i + 1] = newColor.g;
      px[i + 2] = newColor.b;
    }
  }

  changeContrast(imgData, contrast) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      const newColor = this.colorManipulator.calcContrast(px[i], px[i + 1], px[i + 2], 0.5);
      px[i] = newColor.r;
      px[i + 1] = newColor.g;
      px[i + 2] = newColor.b;
    }
  }

  grayscale(imgData) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      const gray = this.colorManipulator.getGray(px[i], px[i + 1], px[i + 2]);
      px[i] = gray;
      px[i + 1] = gray;
      px[i + 2] = gray;
    }
  }

  sepia(imgData) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      const sepia = this.colorManipulator.calcSepia(px[i], px[i + 1], px[i + 2]);
      px[i] = sepia.r;
      px[i + 1] = sepia.g;
      px[i + 2] = sepia.b;
    }
  }
}
