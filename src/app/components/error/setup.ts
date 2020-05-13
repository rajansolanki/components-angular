import { NgModuleRef } from '@angular/core';

import { setupModule } from '@bit/rajansolanki.dev.shared';
import { ErrorModule } from './error.module';

export const setup = (): Promise<NgModuleRef<ErrorModule>> =>
  setupModule(ErrorModule);
