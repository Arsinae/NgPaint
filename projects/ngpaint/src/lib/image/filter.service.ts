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
      hsl.l = Math.min(1, hsl.l * ( 1 + brightness));
      const newColor = this.colorManipulator.hslToRgb(hsl.h, hsl.s, hsl.l);
      px[i] = newColor.r;
      px[i + 1] = newColor.g;
      px[i + 2] = newColor.b;
    }
  }

  changeContrast(imgData, contrast) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      const newColor = this.colorManipulator.calcContrast(px[i], px[i + 1], px[i + 2], contrast);
      px[i] = newColor.r;
      px[i + 1] = newColor.g;
      px[i + 2] = newColor.b;
    }
  }

  changeSaturation(imgData, saturation) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      const hsl = this.colorManipulator.rgbToHsl(px[i], px[i + 1], px[i + 2]);
      hsl.s = Math.min(1, hsl.s * ( 1 + saturation));
      const newColor = this.colorManipulator.hslToRgb(hsl.h, hsl.s, hsl.l);
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

  candy(imgData) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      px[i] = Math.min(255, Math.round(px[i] * 1.05));
      px[i + 1] = Math.min(255, Math.round(px[i + 1] * 0.85));
      px[i + 2] = Math.min(255, Math.round(px[i + 2] * 0.95));
    }
    this.changeBrightness(imgData, 0.1);
    this.changeContrast(imgData, 0.1);
  }

  rainbow(imgData) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      const rainbow = this.colorManipulator.calcRainbow(i, imgData.width);
      px[i] = (rainbow.r + px[i] * 0.6) / 2;
      px[i + 1] = (rainbow.g + px[i + 1] * 0.6) / 2;
      px[i + 2] = (rainbow.b + px[i + 2] * 0.6) / 2;
    }
    this.changeBrightness(imgData, 0.10);
  }

  vignetting(imgData, value) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      const percent = this.colorManipulator.calcVignettingDistance(i, imgData.width, imgData.height, value);
      if (percent > 0) {
        const hsl = this.colorManipulator.rgbToHsl(px[i], px[i + 1], px[i + 2]);
        hsl.l = Math.min(1, hsl.l * (1 - percent));
        const newColor = this.colorManipulator.hslToRgb(hsl.h, hsl.s, hsl.l);
        px[i] = newColor.r;
        px[i + 1] = newColor.g;
        px[i + 2] = newColor.b;
      }
    }
  }

  colorEmphasing(imgData, value) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      px[i] = (value.color === 'red') ? value.intensity : px[i];
      px[i + 1] = (value.color === 'green') ? value.intensity : px[i + 1];
      px[i + 2] = (value.color === 'blue') ? value.intensity : px[i + 2];
    }
  }

  gaussian(imgData) {
    const px = imgData.data;
    for (let i = 0; i < px.length; i += 4) {
      const gaussColor = this.colorManipulator.calcGaussian(px, i, imgData.width, imgData.height);
      px[i] = gaussColor.r;
      px[i + 1] = gaussColor.g;
      px[i + 2] = gaussColor.b;
    }
  }

  sharpen(imgData) {
    const px = imgData.data;
    for (let i = imgData.width * 4; i < px.length - (imgData.width * 4); i += 4) {
      const newColor = this.colorManipulator.calcSharpen(px, i, imgData.width);
      px[i] = newColor.r;
      px[i + 1] = newColor.g;
      px[i + 2] = newColor.b;
    }
  }
}
