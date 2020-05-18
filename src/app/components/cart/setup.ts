import { NgModuleRef } from '@angular/core';

import { setupModule } from '@bit/rajansolanki.dev.shared';
import { CartModule } from './cart.module';

export const setup = (): Promise<NgModuleRef<CartModule>> =>
  setupModule(CartModule);
