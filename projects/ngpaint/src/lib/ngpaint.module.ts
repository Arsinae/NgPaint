import { NgModule } from '@angular/core';
import { NgpaintComponent } from './ngpaint.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidemenuModule} from './sidemenu/sidemenu.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ColorManipulationService} from './color-manipulation.service';
import {FilterService} from './imageManipulation/filter.service';
import {PixelDrawingService} from './imageManipulation/pixel-drawing.service';
import { NgpaintImageDirective } from './imageManipulation/ngpaint-image.directive';
import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SidemenuModule
  ],
  providers: [ColorManipulationService, FilterService, PixelDrawingService],
  declarations: [NgpaintComponent, NgpaintImageDirective],
  exports: [NgpaintComponent, NgpaintImageDirective]
})
export class NgpaintModule { }
