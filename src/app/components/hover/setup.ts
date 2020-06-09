import { NgModuleRef } from '@angular/core';

import { setupModule } from '@bit/rajansolanki.dev.shared';
import { HoverModule } from './hover.module';

export const setup = (): Promise<NgModuleRef<HoverModule>> =>
  setupModule(HoverModule);
