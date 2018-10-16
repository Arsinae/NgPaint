import { NgModule } from '@angular/core';
import { NgpaintComponent } from './ngpaint.component';
import { NgpaintImageDirective } from './image/ngpaint-image.directive';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidemenuModule} from './sidemenu/sidemenu.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ColorManipulationService} from './color-manipulation.service';
import {FilterService} from './image/filter.service';
import 'hammerjs';
import {PixelDrawingService} from './image/pixel-drawing.service';

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
