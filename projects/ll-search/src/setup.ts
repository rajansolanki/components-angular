import { NgModuleRef } from '@angular/core';

import { setupModule } from '@rajansolanki/ll-shared';
import { SearchModule } from './search.module';

export const setup = (): Promise<NgModuleRef<SearchModule>> =>
  setupModule(SearchModule);
