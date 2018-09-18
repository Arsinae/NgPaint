import { NgModule } from '@angular/core';
import { NgpaintComponent } from './ngpaint.component';
import { NgpaintImageDirective } from './image/ngpaint-image.directive';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageContainerComponent } from './image/image-container/image-container.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NgpaintComponent, NgpaintImageDirective, ImageContainerComponent],
  exports: [NgpaintComponent, NgpaintImageDirective]
})
export class NgpaintModule { }
