import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule, MatListModule, MatRadioModule, MatSliderModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgpaintImageDirective} from '../image/ngpaint-image.directive';
import {MenuDirective} from './menu.directive';
import {MenuElementDirective} from './menu-element.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatListModule,
    MatSliderModule,
    MatRadioModule,
    ColorPickerModule
  ],
  declarations: [SidemenuComponent, MenuDirective, MenuElementDirective],
  exports: [
    SidemenuComponent,
    MenuDirective,
    MenuElementDirective
  ]
})
export class SidemenuModule { }
