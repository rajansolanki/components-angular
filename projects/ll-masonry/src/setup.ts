import { NgModuleRef } from '@angular/core';

import { setupModule } from '@rajansolanki/ll-shared';
import { MasonryModule } from './masonry.module';

export const setup = (): Promise<NgModuleRef<MasonryModule>> =>
  setupModule(MasonryModule);
