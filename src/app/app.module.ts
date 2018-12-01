import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import {NgpaintModule} from '../../projects/ngpaint/src/lib/ngpaint.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NgpaintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
