import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CanvasRoutingModule } from './canvas-routing.module';
import { CanvasComponent } from './canvas.componet';



@NgModule({
  declarations: [CanvasComponent],
  imports: [CommonModule, SharedModule, CanvasRoutingModule],
})
export class CanvasModule {}
