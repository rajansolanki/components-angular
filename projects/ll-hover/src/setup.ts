import { NgModuleRef } from '@angular/core';

import { setupModule } from '@rajansolanki/ll-shared';
import { HoverModule } from './hover.module';

export const setup = (): Promise<NgModuleRef<HoverModule>> =>
  setupModule(HoverModule);
