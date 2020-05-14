import { NgModuleRef } from '@angular/core';

import { setupModule } from '@bit/rajansolanki.dev.shared';
import { LoadMoreModule } from './load-more.module';

export const setup = (): Promise<NgModuleRef<LoadMoreModule>> =>
  setupModule(LoadMoreModule);
