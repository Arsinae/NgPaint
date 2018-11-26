import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  downloadImage(dataUri) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(dataUri);
    a.download = 'image.png';
    document.body.appendChild(a);
    a.click();
  }
}
