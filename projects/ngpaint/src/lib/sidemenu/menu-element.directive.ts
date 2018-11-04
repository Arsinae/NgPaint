import { Directive } from '@angular/core';

@Directive({
  selector: '[ngpMenuElement]'
})
export class MenuElementDirective {

  public title = '';
  public submenu = '';
  public effect = '';
  public redirect = '';

  constructor() { }

}
