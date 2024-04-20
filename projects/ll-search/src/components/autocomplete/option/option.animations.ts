import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
} from '@angular/core';

import pose, { DomPopmotionConfig, DomPopmotionPoser } from 'popmotion-pose';

import {
  POSE_LEAVE_ANIMATION,
  POSE_TRANSITION_SPRING,
} from '@rajansolanki/ll-shared';

export const enum POSE_STATES {
  Enter = 'enter',
  Leave = 'leave',
}

export const POSE_CONFIG: DomPopmotionConfig = {
  [POSE_STATES.Enter]: {
    height: 'auto',
    transition: POSE_TRANSITION_SPRING,
  },
  [POSE_STATES.Leave]: {
    height: 0,
    transition: POSE_TRANSITION_SPRING,
  },
  initialPose: POSE_STATES.Leave,
};

export const optionAnimations = POSE_LEAVE_ANIMATION;

@Directive()
export class OptionComponentAnimationsDirective
  implements AfterViewInit, OnDestroy {
  @HostBinding('@enterLeave') enterLeave: void | undefined;

  private poseEl: DomPopmotionPoser;

  constructor(protected el: ElementRef<HTMLElement>) {
    this.poseEl = pose(el.nativeElement, POSE_CONFIG);
  }

  ngAfterViewInit(): void {
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
