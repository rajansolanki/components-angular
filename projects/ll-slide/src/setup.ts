import { NgModuleRef } from '@angular/core';

import { setupModule } from '@rajansolanki/ll-shared';
import { SlideModule } from './slide.module';

export const setup = (): Promise<NgModuleRef<SlideModule>> =>
  setupModule(SlideModule);
