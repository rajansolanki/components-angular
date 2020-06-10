import { NgModuleRef } from '@angular/core';

import { setupModule } from '@bit/rajansolanki.dev.shared';
import { SearchModule } from './search.module';

export const setup = (): Promise<NgModuleRef<SearchModule>> =>
  setupModule(SearchModule);
