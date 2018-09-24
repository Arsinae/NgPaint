import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule, MatListModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatListModule
  ],
  declarations: [SidemenuComponent],
  exports: [
    SidemenuComponent
  ]
})
export class SidemenuModule { }
