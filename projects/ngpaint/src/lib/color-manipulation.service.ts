import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorManipulationService {

  constructor() { }

  rgbToHsl(red, green, blue) {
    const ratio = {r: red / 255, g: green / 255, b: blue / 255};
    const minValue = Math.min(ratio.r, ratio.g, ratio.b);
    const maxValue = Math.max(ratio.r, ratio.g, ratio.b);
    const luminance = Math.round((minValue + maxValue) / 2 * 100);
    let saturation = 0;
    let hue = 0;
    if (minValue !== maxValue) {
      saturation = this.calcSaturation(minValue, maxValue, luminance);
      hue = this.calcHue(ratio, minValue, maxValue);
    }
    return {h: hue, s: saturation / 100, l: luminance / 100};
  }

  calcSaturation(minValue, maxValue, luminance) {
    if (luminance < 50) {
      return Math.round((maxValue - minValue) / (maxValue + minValue) * 100);
    } else {
      return Math.round((maxValue - minValue) / (2 - maxValue - minValue) * 100);
    }
  }

  calcHue(ratio, minValue, maxValue) {
    if (ratio.r === maxValue) {
      return Math.round((ratio.g - ratio.b) / (maxValue - minValue) * 60);
    } else if (ratio.g === maxValue) {
      return Math.round((2 + (ratio.b - ratio.r) / (maxValue - minValue)) * 60);
    } else {
      return Math.round((4 + (ratio.r - ratio.g) / (maxValue - minValue)) * 60);
    }
  }

  hslToRgb(hue, saturation, luminance) {
    const c = (1 - Math.abs(2 * luminance - 1)) * saturation;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = luminance - c / 2;
    let prime = {r: 0, g: 0, b: 0};
    if (hue < 60 || hue === 360) {
      prime = {r: c, g: x, b: 0};
    } else if (hue < 120) {
      prime = {r: x, g: c, b: 0};
    } else if (hue < 180) {
      prime = {r: 0, g: c, b: x};
    } else if (hue < 240) {
      prime = {r: 0, g: x, b: c};
    } else if (hue < 300) {
      prime = {r: x, g: 0, b: c};
    } else  {
      prime = {r: c, g: 0, b: x};
    }
    return {r: Math.round((prime.r + m) * 255),
      g: Math.round((prime.g + m) * 255),
      b: Math.round((prime.b + m) * 255)
    };
  }

  invertColor(colorCode) {
    return 255 - colorCode;
  }

  getGray(red, green, blue) {
    return Math.round(red * 0.299 + green * 0.587 + blue * 0.114);
  }

  calcSepia(red, green, blue) {
    const tr = Math.round(0.393 * red + 0.769 * green + 0.189 * blue);
    const tg = Math.round(0.349 * red + 0.686 * green + 0.168 * blue);
    const tb = Math.round(0.272 * red + 0.534 * green + 0.131 * blue);
    return {
      r: Math.min(255, tr),
      g: Math.min(255, tg),
      b: Math.min(255, tb)
    };
  }

  calcContrast(red, green, blue, contrast) {
    const c = Math.pow((1 + contrast), 2);
    const r = Math.round((((red / 255) - 0.5) * c + 0.5) * 255);
    const g = Math.round((((green / 255) - 0.5) * c + 0.5) * 255);
    const b = Math.round((((blue / 255) - 0.5) * c + 0.5) * 255);
    return {r: r, g: g, b: b};
  }

  calcGaussian(data, i, width, height) {
    const newColor = {r: 0, g: 0, b: 0};
    let counter = 1;
    newColor.r = data[i];
    newColor.g = data[i + 1];
    newColor.b = data[i + 2];
    if (i / 4 >= width) {
      newColor.r += data[i - (width * 4)];
      newColor.g += data[i - (width * 4) + 1];
      newColor.b += data[i - (width * 4) + 2];
      counter += 1;
    }
    if (i / 4 < height * width - width) {
      newColor.r += data[i + (width * 4)];
      newColor.g += data[i + (width * 4) + 1];
      newColor.b += data[i + (width * 4) + 2];
      counter += 1;
    }
    if (i / 4 % width !== 0) {
      newColor.r += data[i - 4];
      newColor.g += data[i - 4 + 1];
      newColor.b += data[i - 4 + 2];
      counter += 1;
    }
    if ((i / 4 + 1) % width !== 0) {
      newColor.r += data[i + 4];
      newColor.g += data[i + 4 + 1];
      newColor.b += data[i + 4 + 2];
      counter += 1;
    }
    newColor.r /= counter;
    newColor.g /= counter;
    newColor.b /= counter;
    return newColor;
  }
}
