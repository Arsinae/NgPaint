import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  downloadImage(dataUri) {
    const href = document.createElement('a');
    href.href = dataUri;
    href.setAttribute('download', 'image.png');
  }
}
