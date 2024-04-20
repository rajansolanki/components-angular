import { NgModuleRef } from '@angular/core';

import { setupModule } from '@rajansolanki/ll-shared';
import { LoadingBarModule } from './loading-bar.module';

export const setup = (): Promise<NgModuleRef<LoadingBarModule>> =>
  setupModule(LoadingBarModule);
