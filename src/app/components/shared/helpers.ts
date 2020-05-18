import { NgModuleRef, getPlatform, Type, Injector } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import {
  AnimationMetadata,
  trigger,
  transition,
  animate,
} from '@angular/animations';

const IMAGE_XS = 550;

export const POSE_TRANSITION_SPRING = {
  type: 'spring',
  stiffness: 150,
  damping: 15,
};

export const POSE_LEAVE_ANIMATION: AnimationMetadata[] = [
  trigger('enterLeave', [transition(':leave', animate('0.5s'))]),
];

export const setupModule = <T>(module: Type<T>): Promise<NgModuleRef<T>> =>
  (getPlatform() || platformBrowser()).bootstrapModule(module);

export const bootstrapModule = <T>(
  name: string,
  component: Type<T>,
  injector: Injector
): void => {
  if (customElements.get(name)) return;

  customElements.define(
    name,
    createCustomElement(component, {
      injector,
    })
  );
};

export const createImageWidth = (): number => {
  const width = window.innerWidth;
  if (!width || width < IMAGE_XS) return IMAGE_XS;

  return Math.ceil(width / 100) * 100;
};
