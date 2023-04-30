import {
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  AfterViewInit,
  OnInit,
} from '@angular/core';

import pose, { DomPopmotionConfig, DomPopmotionPoser } from 'popmotion-pose';

import {
  POSE_LEAVE_ANIMATION,
  POSE_TRANSITION_SPRING,
} from '@bit/rajansolanki.dev.shared';

export const enum POSE_STATES {
  Leave = 'leave',
  Enter = 'enter',
  Open = 'open',
}

export const POSE_CONFIG: DomPopmotionConfig = {
  [POSE_STATES.Leave]: {
    height: 0,
    scale: 0.7,
    transition: { type: 'tween', ease: 'anticipate' },
  },
  [POSE_STATES.Enter]: {
    height: 55,
    scale: 1,
    transition: POSE_TRANSITION_SPRING,
  },
  [POSE_STATES.Open]: {
    height: 'auto',
    scale: 1,
    transition: POSE_TRANSITION_SPRING,
  },
  initialPose: POSE_STATES.Leave,
};

export const cartContentAnimations = POSE_LEAVE_ANIMATION;

@Directive()
export class CartContentAnimationsDirective
  implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('@enterLeave') enterLeave: void | undefined;

  private poseEl: DomPopmotionPoser;

  constructor(protected el: ElementRef<HTMLElement>) {
    this.poseEl = pose(el.nativeElement, POSE_CONFIG);
  }

  ngAfterViewInit() {
    setTimeout(() => this.poseEl.set(POSE_STATES.Open), 1300);
  }

  ngOnInit() {
    this.poseEl.set(POSE_STATES.Enter);
  }

  async ngOnDestroy(): Promise<void> {
    try {
      await this.poseEl.set(POSE_STATES.Leave);
    } finally {
      this.poseEl.destroy();
    }
  }
}
