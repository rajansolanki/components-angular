import { NgModuleRef } from '@angular/core';

import { setupModule } from '@bit/rajansolanki.dev.shared';
import { MasonryModule } from './masonry.module';

export const setup = (): Promise<NgModuleRef<MasonryModule>> =>
  setupModule(MasonryModule);
