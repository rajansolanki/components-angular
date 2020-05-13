import {
  animate,
  AnimationMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const errorAnimations: AnimationMetadata[] = [
  trigger('enterLeave', [
    transition(':enter', [
      style({ height: 0 }),
      animate('0.4s cubic-bezier(0.86, 0, 0.07, 1)', style({ height: '*' })),
    ]),
    transition(':leave', [
      animate('0.2s cubic-bezier(0.86, 0, 0.07, 1)', style({ height: 0 })),
    ]),
  ]),
];
