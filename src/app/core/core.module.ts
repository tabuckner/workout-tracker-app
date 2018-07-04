import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiService } from './api/api.service';
import { HeaderService } from './header/header.service';
import { AuthService } from './auth/auth.service';
import { LogInComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LogInComponent,
  ],
  providers: [
    ApiService,
    HeaderService,
    AuthService
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('CoreModule is only to be imported once, in AppModule or Bootstrapped Module.');
    }
  }

}
