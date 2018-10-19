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
    href.innerText = 'image';
    href.onclick = () => {
      console.log('a');
    };
    href.click();
    document.body.appendChild(href);
  }
}
