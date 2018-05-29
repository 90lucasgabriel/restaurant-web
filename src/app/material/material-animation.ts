import { trigger, state, style, animate, transition }   from '@angular/animations';

export const ANIMATION = [
  trigger('hfold', [
    transition(':enter', [style({width: 0,    overflow: 'hidden'}), animate('.4s ease', style({width: '*',  opacity: 1}))]),
    transition(':leave', [style({width: '*',  overflow: 'hidden'}), animate('.4s ease', style({width: 0,    opacity: 0}))])
  ]),
  trigger('vfold', [
    transition(':enter', [style({height: 0,   overflow: 'hidden'}), animate('.4s ease', style({height: '*', opacity: 1}))]),
    transition(':leave', [style({height: '*', overflow: 'hidden'}), animate('.4s ease', style({height: 0,   opacity: 0}))])
  ])
];

