import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';



@NgModule({
  declarations: [LandingComponent],
  imports: [SharedModule, LandingRoutingModule],
  
})
export class LandingModule {}
