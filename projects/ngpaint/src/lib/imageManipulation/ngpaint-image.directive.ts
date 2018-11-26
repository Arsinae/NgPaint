import { Directive } from '@angular/core';

@Directive({
  selector: '[ngpNgpaintImage]'
})
export class NgpaintImageDirective {

  public dataUri: string = null;
  public dataUriBase: string = null;
  public size: {x, y} = {x: 0, y: 0};

  constructor() { }

}
