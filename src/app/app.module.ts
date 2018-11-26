import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgpaintModule} from '../../projects/ngpaint/src/lib/ngpaint.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgpaintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
