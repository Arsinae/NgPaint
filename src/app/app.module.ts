import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgpaintModule} from '../../projects/ngpaint/src/lib/ngpaint.module';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    NgpaintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
