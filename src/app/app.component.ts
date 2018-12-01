import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  menu = [
    {title: 'Dessin', submenu: '', redirect: 'draw', effect: null},
    {title: 'Effet', submenu: '', redirect: 'effect', effect: null},
    {title: 'Gestion', submenu: '', redirect: 'manage', effect: null},
    {title: 'Image d\'origine', submenu: '/manage', redirect: null, effect: 'reset'},
    {title: 'Changer d\'image', submenu: '/manage', redirect: null, effect: 'changePicture'},
    {title: 'Télécharger', submenu: '/manage', redirect: null, effect: 'download'},
    {title: 'Forme Basique', submenu: '/draw', redirect: null, effect: 'basicDrawForm'},
    {title: 'Couleur', submenu: '/draw', redirect: null, effect: 'colorPicker'},
    {title: 'Taille', submenu: '/draw', redirect: null, effect: 'sizeSlider'},
    {title: 'Luminosité et Contraste', submenu: '/effect', redirect: 'hsl', effect: null},
    {title: 'Filtres', submenu: '/effect', redirect: 'filter', effect: null},
    {title: 'Souligner une couleur', submenu: '/effect', redirect: 'emphasing', effect: null},
    {title: 'Splash', submenu: '/effect', redirect: 'splash', effect: null},
    {title: 'Luminosité', submenu: '/effect/hsl', redirect: null, effect: 'brightness'},
    {title: 'Contraste', submenu: '/effect/hsl', redirect: null, effect: 'contrast'},
    {title: 'Saturation', submenu: '/effect/hsl', redirect: null, effect: 'saturation'},
    {title: 'Négatif', submenu: '/effect/filter', redirect: null, effect: 'invert'},
    {title: 'Grayscale', submenu: '/effect/filter', redirect: null, effect: 'grayscale'},
    {title: 'Sépia', submenu: '/effect/filter', redirect: null, effect: 'sepia'},
    {title: 'Candy', submenu: '/effect/filter', redirect: null, effect: 'candy'},
    {title: 'Arc-en-Ciel', submenu: '/effect/filter', redirect: null, effect: 'rainbow'},
    {title: 'Suite', submenu: '/effect/filter', redirect: '2', effect: null},
    {title: 'Flou Gaussien', submenu: '/effect/filter/2', redirect: null, effect: 'gaussian'},
    {title: 'Sharpen', submenu: '/effect/filter/2', redirect: null, effect: 'sharpen'},
    {title: 'Vignette', submenu: '/effect/filter/2', redirect: null, effect: 'vignette'},
    {title: 'Réchauffer', submenu: '/effect/filter/2', redirect: null, effect: 'warmer'},
    {title: 'Refroidir', submenu: '/effect/filter/2', redirect: null, effect: 'colder'},
    {title: 'Rouge;Vert;Bleu;Valeur', submenu: '/effect/emphasing', redirect: null, effect: 'emphasing'},
    {title: 'Splash', submenu: '/effect/splash', redirect: null, effect: 'splash'}
  ];

  downloadImage(dataUri) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(dataUri);
    a.download = 'image.png';
    document.body.appendChild(a);
    a.click();
  }
}
