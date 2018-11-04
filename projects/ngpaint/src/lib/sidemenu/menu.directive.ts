import { Directive } from '@angular/core';
import {MenuElementDirective} from './menu-element.directive';

@Directive({
  selector: '[ngpMenu]'
})
export class MenuDirective {

  public color = 'white';
  public validateText = 'Valider';

  public menu: Array<MenuElementDirective> = [
    {title: 'Dessin', submenu: '', redirect: 'draw', effect: null},
    {title: 'Effet', submenu: '', redirect: 'effect', effect: null},
    {title: 'Télécharger', submenu: '', redirect: null, effect: 'download'},
    {title: 'Pinceau', submenu: '/draw', redirect: null, effect: 'pen'},
    {title: 'Carré', submenu: '/draw', redirect: null, effect: 'square'},
    {title: 'Rond', submenu: '/draw', redirect: null, effect: 'round'},
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
    {title: 'Flou Gaussien', submenu: '/effect/filter', redirect: null, effect: 'gaussian'},
    {title: 'Sharpen', submenu: '/effect/filter', redirect: null, effect: 'sharpen'},
    {title: 'Vignette', submenu: '/effect/filter', redirect: null, effect: 'vignette'},
    {title: 'Réchauffer', submenu: '/effect/filter', redirect: null, effect: 'warmer'},
    {title: 'Refroidir', submenu: '/effect/filter', redirect: null, effect: 'colder'},
    {title: 'Rouge;Vert;Bleu;Valeur', submenu: '/effect/emphasing', redirect: null, effect: 'emphasing'},
    {title: 'Splash', submenu: '/effect/splash', redirect: null, effect: 'splash'}
  ];

  constructor() { }

}
