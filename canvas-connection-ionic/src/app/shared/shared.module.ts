import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
  ],
  exports: [CommonModule, IonicModule, ReactiveFormsModule, HttpClientModule],
})
export class SharedModule {}
