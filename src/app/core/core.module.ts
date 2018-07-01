import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiService } from './api/api.service';
import { HeaderService } from './header/header.service';

@NgModule({
  providers: [
    ApiService,
    HeaderService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('CoreModule is only to be imported once, in AppModule or Bootstrapped Module.');
    }
  }

}
