import { NgModuleRef } from '@angular/core';

import { setupModule } from '@rajansolanki/ll-shared';
import { LoadMoreModule } from './load-more.module';

export const setup = (): Promise<NgModuleRef<LoadMoreModule>> =>
  setupModule(LoadMoreModule);
