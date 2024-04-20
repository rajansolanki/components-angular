import { NgModuleRef } from '@angular/core';

import { setupModule } from '@rajansolanki/ll-shared';
import { ErrorModule } from './error.module';

export const setup = (): Promise<NgModuleRef<ErrorModule>> =>
  setupModule(ErrorModule);
