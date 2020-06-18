import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { CartComponent } from './components/cart.component';
import { CartContentComponent } from './components/content/content.component';
import { CartItemComponent } from './components/content/item/item.component';
import { CheckoutService } from './services/checkout.service';

export const NAME = 'component-cart';

@NgModule({
  declarations: [CartComponent, CartContentComponent, CartItemComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [CheckoutService],
  entryComponents: [CartComponent],
})
export class CartModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, CartComponent, this.injector);
  }
}
