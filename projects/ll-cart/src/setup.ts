import { NgModuleRef } from '@angular/core';

import { setupModule } from '@rajansolanki/ll-shared';
import { CartModule } from './cart.module';

export const setup = (): Promise<NgModuleRef<CartModule>> =>
  setupModule(CartModule);
